// ---------------------------------------------------------------------------
// READING & LITERATURE — MODULE 4 · FROM SEED TO SPROUT · Quarter 1, weeks 7–8
// and THE QUARTER 1 READING TEST.
//
// Sequence: first, next, then, last. Informational passages, one how-to she
// can actually do, and one story. Every passage is new — Khan has no unit on
// this theme, so there is no optional watch. The herbalist thread runs through
// the whole module on purpose. Blueprint: claude/reading-course-blueprint.md.
//
// ---- FACTS, CHECKED ----
// A seed has a coat, a tiny plant, and stored food. When it sprouts, water
// soaks in, the seed swells, the coat splits, the root comes out first and
// grows down, then the shoot comes up bent like a hook. Seeds travel by wind
// (dandelion), on fur (burrs), by water (coconut), and by bursting pods.
// Basil sprouts in about a week in a warm, sunny spot. Carrots and sweet
// potatoes are roots that store food.
//
// ---- SAFETY ----
// The bean-in-a-jar lesson needs a grown-up and says in so many words that the
// beans are for watching, not eating. Nothing in any passage is tasted.
//
// ---- THE QUARTER 1 TEST ----
// Two new passages, twelve questions, no read-aloud (Gigi, Sept 23 2026). One
// story told by a surprising teller (Module 1's skill) and one informational
// passage in steps (Modules 2–4). It goes into her ON HER OWN score.
//
// Measured by analyse() against the Quarter 1 cap: 11 words a sentence, 6%
// long words.
// ---------------------------------------------------------------------------

export const READING_M4 = {
  id: 'rd-m4',
  module: 4,
  quarter: 1,
  title: 'From Seed to Sprout',
  genre: 'informational and how-to',
  skill: 'order of events — first, next, then, last',
  khanWatch: null,
  book: {
    title: 'A Seed Is Sleepy',
    author: 'Dianna Hutts Aston',
    illustrator: 'Sylvia Long',
    publisher: 'Chronicle Books',
    ages: 'Ages 5–10 (publisher)',
    note: 'Seeds of every shape, how they travel, and how they wake up.',
    verifiedOn: '2026-09-23',
    source: 'https://www.chroniclebooks.com/products/a-seed-is-sleepy-paperback'
  },
  lessons: [
    {
      id: 'rd-m4-01',
      module: 4,
      week: 7,
      day: 1,
      title: 'What Is Inside a Seed',
      skill: 'parts, in order',
      text: `A seed looks like a tiny stone. But it is alive. Inside, it has three parts.

The outside is the seed coat. It is like a jacket. It keeps the inside safe and dry.

Inside the coat is a baby plant. It is very, very small. It has a tiny root and a tiny stem, all folded up.

Next to the baby plant is its food. The seed carries this food with it. The baby plant will use it to grow, before it has any leaves to make its own food.

You can see these parts for yourself. Ask a grown-up to soak a big bean in water overnight. Soak means to leave it sitting in the water. In the morning, the coat will peel off. Open the bean with care, and look for the baby plant inside.`,
      questions: [
        {
          id: 'rd-m4-01-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'The three parts inside a seed',
            'How to cook beans',
            'Why stones are hard',
            'How leaves make food'
          ],
          answer: 0,
          feedback: [
            null,
            'Nobody cooks in this passage.',
            'A seed only LOOKS like a stone.',
            'Leaves come later. They are not in the seed yet.'
          ],
          why: 'The first paragraph says a seed has three parts, and the next three tell you each one.'
        },
        {
          id: 'rd-m4-01-q2',
          kind: 'word',
          prompt: '"Soak a big bean in water overnight." What does soak mean?',
          choices: [
            'Cook it',
            'Leave it sitting in the water',
            'Throw it away',
            'Plant it in the ground'
          ],
          answer: 1,
          feedback: [
            'Nothing is cooked.',
            null,
            'You need the bean to look inside it.',
            'It goes in water, not soil.'
          ],
          why: 'The next sentence tells you: "Soak means to leave it sitting in the water."'
        },
        {
          id: 'rd-m4-01-q3',
          kind: 'detail',
          prompt: 'What does the baby plant use to grow before it has leaves?',
          choices: ['The seed coat', 'Sunlight', 'The food packed in the seed', 'Stones'],
          answer: 2,
          feedback: [
            'The coat is a jacket. It keeps the inside safe.',
            'It has no leaves yet to use the sun.',
            null,
            'The seed only looks like a stone.'
          ],
          why: 'The seed carries food with it, and the baby plant uses it to grow.'
        },
        {
          id: 'rd-m4-01-q4',
          kind: 'inference',
          prompt: 'Why does a seed need to carry its own food?',
          choices: [
            'The seed coat eats it',
            'So the seed can float',
            'So it looks like a stone',
            'The baby plant has no leaves yet to make food'
          ],
          answer: 3,
          feedback: [
            'The coat keeps the inside safe. It does not eat.',
            'The passage says nothing about floating.',
            'Food is inside, where you cannot see it.',
            null
          ],
          why: 'The passage says it uses the food before it has any leaves to make its own.'
        }
      ]
    },
    {
      id: 'rd-m4-02',
      module: 4,
      week: 7,
      day: 2,
      title: 'A Seed Wakes Up',
      skill: 'order of events',
      text: `A dry seed can wait a long time. It does not grow. It is waiting for water.

First, the seed gets wet. Water soaks in through the seed coat.

Next, the seed swells. It gets fat, and the coat splits open.

Then a root pushes out. The root always grows down, into the soil. It holds the plant in place and drinks water.

After that, a shoot pushes up. It bends like a hook and pulls itself out of the soil.

Last, the shoot opens up into its first two leaves. Now the sun can reach them. The little plant can start to make its own food.

This is called sprouting. It can take just a few days.`,
      questions: [
        {
          id: 'rd-m4-02-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How long a dry seed can wait',
            'The steps a seed goes through when it starts to grow',
            'Why the sun is hot',
            'How to bend a hook'
          ],
          answer: 1,
          feedback: [
            'That is only the first paragraph.',
            null,
            'The sun is only named at the end.',
            'The shoot bends LIKE a hook.'
          ],
          why: 'First, next, then, after that, last — the passage walks through each step.'
        },
        {
          id: 'rd-m4-02-q2',
          kind: 'word',
          prompt: '"Next, the seed swells." What does swells mean?',
          choices: ['Gets smaller', 'Dries out', 'Gets bigger', 'Turns green'],
          answer: 2,
          feedback: [
            'It gets fat. That is bigger.',
            'It has just gotten wet.',
            null,
            'The passage does not say that here.'
          ],
          why: 'The next words say "It gets fat."'
        },
        {
          id: 'rd-m4-02-q3',
          kind: 'detail',
          prompt: 'Which comes out of the seed first?',
          choices: ['The shoot', 'Two leaves', 'A flower', 'The root'],
          answer: 3,
          feedback: [
            'The shoot comes after the root.',
            'The leaves come last.',
            'There are no flowers yet.',
            null
          ],
          why: 'After the coat splits, "Then a root pushes out."'
        },
        {
          id: 'rd-m4-02-q4',
          kind: 'inference',
          prompt: 'What would happen if a dry seed never got wet?',
          choices: [
            'It would keep waiting and not grow',
            'It would grow faster',
            'It would turn into a leaf',
            'It would float away'
          ],
          answer: 0,
          feedback: [
            null,
            'Water is the first step.',
            'It cannot start without water.',
            'The passage says nothing about floating.'
          ],
          why: 'A dry seed "does not grow. It is waiting for water."'
        }
      ]
    },
    {
      id: 'rd-m4-03',
      module: 4,
      week: 7,
      day: 3,
      title: 'Sprout a Bean in a Jar',
      skill: 'following steps',
      text: `You will need a clear jar, two paper towels, three dry beans, and some water. Ask a grown-up to help.

Step 1. Fold the paper towels. Push them into the jar so they press against the glass.

Step 2. Slide the beans down between the towel and the glass. Space them out so you can see each one.

Step 3. Pour in a little water. The towels should be wet, but no water should sit at the bottom.

Step 4. Put the jar in a warm place. Add a little water each day, so the towels stay damp. Damp means a little wet.

Step 5. Watch. In a few days, a root will poke out. Then a shoot will climb up.

Do not eat the beans. They are for watching, not for eating.`,
      questions: [
        {
          id: 'rd-m4-03-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How to cook beans',
            'How to fold paper towels',
            'How to grow a bean in a jar so you can watch it sprout',
            'Why glass is clear'
          ],
          answer: 2,
          feedback: [
            'The passage says not to eat them.',
            'Folding is only step 1.',
            null,
            'The passage does not say why.'
          ],
          why: 'It lists what you need, then five steps, ending with watching the bean sprout.'
        },
        {
          id: 'rd-m4-03-q2',
          kind: 'word',
          prompt: '"So the towels stay damp." What does damp mean?',
          choices: ['Very dry', 'Folded', 'Warm', 'A little wet'],
          answer: 3,
          feedback: [
            'You add water to keep them damp.',
            'Folding was step 1.',
            'Warm is about the place, not the towels.',
            null
          ],
          why: 'The passage says: "Damp means a little wet."'
        },
        {
          id: 'rd-m4-03-q3',
          kind: 'detail',
          prompt: 'Where do the beans go?',
          choices: [
            'Between the towel and the glass',
            'At the bottom in the water',
            'Under the jar',
            'On top of the lid'
          ],
          answer: 0,
          feedback: [
            null,
            'No water should sit at the bottom.',
            'They go inside the jar.',
            'Read step 2 again.'
          ],
          why: 'Step 2: "Slide the beans down between the towel and the glass."'
        },
        {
          id: 'rd-m4-03-q4',
          kind: 'inference',
          prompt: 'Why does the jar need to be clear?',
          choices: [
            'So the beans stay dry',
            'So you can see the bean grow',
            'So the jar is lighter',
            'So you can eat the beans'
          ],
          answer: 1,
          feedback: [
            'You want them to get wet.',
            null,
            'The passage says nothing about weight.',
            'You must not eat them.'
          ],
          why: 'The whole point is to watch, and you can only watch through clear glass.'
        }
      ]
    },
    {
      id: 'rd-m4-04',
      module: 4,
      week: 8,
      day: 1,
      title: 'Seeds on the Move',
      skill: 'ways, one by one',
      text: `A plant cannot walk. So how do its seeds get to new places? Plants have clever ways.

Some seeds ride the wind. A dandelion seed has a soft, white puff. The wind lifts it and carries it far away.

Some seeds hitch a ride on animals. A burr has tiny hooks. It sticks to a dog's fur. Later, it falls off somewhere new.

Some seeds float. A coconut is a big seed. It can float on the sea for a long time and wash up on a new beach.

Some seeds shoot out. When a pod dries, it bursts open with a pop and throws its seeds.

Why move at all? If every seed dropped straight down, the new plants would crowd the old one. They would fight for sun and water.`,
      questions: [
        {
          id: 'rd-m4-04-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'Why dogs have fur',
            'How to open a coconut',
            'Why plants cannot walk',
            'The ways seeds travel to new places'
          ],
          answer: 3,
          feedback: [
            'Fur is one example.',
            'The coconut floats. Nobody opens it.',
            'That is only the first line.',
            null
          ],
          why: 'It asks how seeds get to new places, then gives four ways.'
        },
        {
          id: 'rd-m4-04-q2',
          kind: 'word',
          prompt: '"Some seeds hitch a ride on animals." What does hitch a ride mean?',
          choices: [
            'Go along by holding on to something else',
            'Walk by itself',
            'Grow very tall',
            'Fall straight down'
          ],
          answer: 0,
          feedback: [
            null,
            'A seed cannot walk.',
            'Nothing here is about growing.',
            'That is what the seeds are trying NOT to do.'
          ],
          why: 'The burr sticks to a dog and goes where the dog goes.'
        },
        {
          id: 'rd-m4-04-q3',
          kind: 'detail',
          prompt: 'What helps a burr stick to fur?',
          choices: ['A soft, white puff', 'Tiny hooks', 'Water', 'A loud pop'],
          answer: 1,
          feedback: [
            'That is the dandelion.',
            null,
            'That is the coconut.',
            'That is the pod.'
          ],
          why: 'It says: "A burr has tiny hooks."'
        },
        {
          id: 'rd-m4-04-q4',
          kind: 'inference',
          prompt: 'Why is it good for seeds to move away from the plant they came from?',
          choices: [
            'So the dog has something to do',
            'So the seeds can see the sea',
            'So the new plants do not crowd the old one',
            'So the wind has a job'
          ],
          answer: 2,
          feedback: [
            'The dog is just one way.',
            'Seeds cannot see.',
            null,
            'The wind is just one way.'
          ],
          why: 'If every seed dropped straight down, they would fight for sun and water.'
        }
      ]
    },
    {
      id: 'rd-m4-05',
      module: 4,
      week: 8,
      day: 2,
      title: 'From Sprout to Flower',
      skill: 'order of events',
      text: `A sprout is only the start. Here is what happens next.

First, the stem grows taller. More leaves open, one pair at a time. The leaves catch the sun and make food.

Next, the roots grow longer and spread out under the soil. They drink water for the whole plant.

Then small, tight buds form at the top. A bud is a flower that has not opened yet.

After that, the buds open into flowers. Bees and other helpers come to visit.

Last, the flowers fade and fall. Where each flower was, seeds begin to form. When the seeds are ready, they fall to the ground.

And then? The whole thing can start again.`,
      questions: [
        {
          id: 'rd-m4-05-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How a plant grows from a sprout to a flower, and makes seeds',
            'How bees make honey',
            'Why roots grow under the soil',
            'How to pick flowers'
          ],
          answer: 0,
          feedback: [
            null,
            'Bees only visit. Honey is not named.',
            'Roots are one step.',
            'Nobody picks anything.'
          ],
          why: 'It follows the plant, step by step, until it makes new seeds.'
        },
        {
          id: 'rd-m4-05-q2',
          kind: 'word',
          prompt: 'What is a bud?',
          choices: [
            'A new root',
            'A kind of bee',
            'A flower that has not opened yet',
            'A seed on the ground'
          ],
          answer: 2,
          feedback: [
            'Roots are in the paragraph before.',
            'Bees come after the buds open.',
            null,
            'Seeds come last.'
          ],
          why: 'It says: "A bud is a flower that has not opened yet."'
        },
        {
          id: 'rd-m4-05-q3',
          kind: 'detail',
          prompt: 'What do the roots do for the plant?',
          choices: [
            'Catch the sun',
            'Drink water for the whole plant',
            'Make the flowers',
            'Call the bees'
          ],
          answer: 1,
          feedback: [
            'That is the leaves.',
            null,
            'The roots are under the soil.',
            'The passage does not say that.'
          ],
          why: 'It says the roots "drink water for the whole plant."'
        },
        {
          id: 'rd-m4-05-q4',
          kind: 'inference',
          prompt: 'Why does the passage end, "The whole thing can start again"?',
          choices: [
            'The plant forgot what to do',
            'The bees take the plant away',
            'The flower opens a second time',
            'The new seeds can grow into new plants'
          ],
          answer: 3,
          feedback: [
            'Plants do not forget.',
            'The bees only visit.',
            'The flower fades and falls.',
            null
          ],
          why: 'The seeds fall to the ground, and each one can become a sprout.'
        }
      ]
    },
    {
      id: 'rd-m4-06',
      module: 4,
      week: 8,
      day: 3,
      title: 'Nana Rose Saves Seeds',
      skill: 'order of events in a story',
      text: `Every fall, Nana Rose saves seeds from her garden. This year, Imani helped.

First, they picked the fattest pods from the bean plants. The pods were dry and brown. They rattled when Imani shook them.

Next, they sat on the porch and cracked the pods open. The beans fell into a bowl. Imani counted forty two.

Then they spread the beans on a tray. "They have to dry all the way," said Nana Rose. "Or they will get moldy in the jar."

A week later, the beans were hard as buttons. Imani poured them into a glass jar. Nana Rose wrote on the lid: BEANS, FALL.

"Now we wait," said Nana Rose. "In spring, these will be our garden."`,
      questions: [
        {
          id: 'rd-m4-06-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'Imani learns to count',
            'Nana Rose cooks beans',
            'How to make buttons',
            'Imani helps Nana Rose save bean seeds for spring'
          ],
          answer: 3,
          feedback: [
            'She counts once. That is one detail.',
            'Nobody cooks. The beans are saved.',
            'The beans are only AS hard as buttons.',
            null
          ],
          why: 'Step by step, they pick, crack, dry and store the seeds for spring.'
        },
        {
          id: 'rd-m4-06-q2',
          kind: 'word',
          prompt: '"They rattled when Imani shook them." What does rattled mean?',
          choices: [
            'Broke into pieces',
            'Made a shaking, clicking sound',
            'Turned green',
            'Grew bigger'
          ],
          answer: 1,
          feedback: [
            'They were cracked later, on the porch.',
            null,
            'They were dry and brown.',
            'They were already done growing.'
          ],
          why: 'The dry beans moved around inside the pods when she shook them.'
        },
        {
          id: 'rd-m4-06-q3',
          kind: 'detail',
          prompt: 'How many beans did Imani count?',
          choices: ['Forty two', 'Twelve', 'One hundred', 'Four'],
          answer: 0,
          feedback: [
            null,
            'Read the third paragraph again.',
            'Read the third paragraph again.',
            'Read the third paragraph again.'
          ],
          why: 'It says: "Imani counted forty two."'
        },
        {
          id: 'rd-m4-06-q4',
          kind: 'inference',
          prompt: 'Why did the beans have to dry all the way before going in the jar?',
          choices: [
            'So they would fit in the jar',
            'So they would rattle',
            'So they would not get moldy',
            'So Nana Rose could write on the lid'
          ],
          answer: 2,
          feedback: [
            'Drying is not about size.',
            'They rattled in the pods, before.',
            null,
            'She could write on it any time.'
          ],
          why: 'Nana Rose says: "Or they will get moldy in the jar."'
        }
      ]
    }
  ],
  tests: [
    {
      id: 'rd-m4-t1',
      module: 4,
      week: 7,
      kind: 'weekly',
      readAloud: false,
      title: 'Planting a Pot of Basil',
      text: `Basil is an herb that smells sweet. You can grow it in a pot.

First, fill a pot with soil. Leave a little space at the top.

Next, press a few basil seeds into the soil. Do not push them deep. Just cover them with a thin layer of soil.

Then water the pot gently. Gently means softly and slowly. Too much water, too fast, will wash the seeds away.

Put the pot in a sunny window. Basil loves the sun.

In about a week, tiny green leaves will pop up. Keep the soil damp, and keep the pot in the sun.

Soon you will have a whole pot of basil.`,
      questions: [
        {
          id: 'rd-m4-t1-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How to cook with basil',
            'Why windows let in sun',
            'How to grow basil in a pot',
            'How to wash seeds'
          ],
          answer: 2,
          feedback: [
            'Nobody cooks in this passage.',
            'The window is one step.',
            null,
            'Washing seeds away is what you must NOT do.'
          ],
          why: 'It gives the steps, from filling the pot to a whole pot of basil.'
        },
        {
          id: 'rd-m4-t1-q2',
          kind: 'word',
          prompt: '"Water the pot gently." What does gently mean?',
          choices: ['Softly and slowly', 'Very fast', 'Every hour', 'With cold water'],
          answer: 0,
          feedback: [
            null,
            'Too fast will wash the seeds away.',
            'The passage does not say that.',
            'The passage does not say that.'
          ],
          why: 'The passage says: "Gently means softly and slowly."'
        },
        {
          id: 'rd-m4-t1-q3',
          kind: 'detail',
          prompt: 'What is the first step?',
          choices: [
            'Water the pot',
            'Press in the seeds',
            'Put it in a window',
            'Fill a pot with soil'
          ],
          answer: 3,
          feedback: [
            'That is the third step.',
            'That is the second step.',
            'That comes after watering.',
            null
          ],
          why: 'It says: "First, fill a pot with soil."'
        },
        {
          id: 'rd-m4-t1-q4',
          kind: 'detail',
          prompt: 'Where should the pot go?',
          choices: [
            'In a dark closet',
            'In a sunny window',
            'Under the bed',
            'Outside in the rain'
          ],
          answer: 1,
          feedback: [
            'Basil loves the sun.',
            null,
            'Basil loves the sun.',
            'The passage says a sunny window.'
          ],
          why: 'It says: "Put the pot in a sunny window."'
        },
        {
          id: 'rd-m4-t1-q5',
          kind: 'detail',
          prompt: 'About how long until tiny leaves pop up?',
          choices: ['About a week', 'One hour', 'One year', 'The same day'],
          answer: 0,
          feedback: [
            null,
            'Read the sixth paragraph.',
            'Read the sixth paragraph.',
            'Read the sixth paragraph.'
          ],
          why: 'It says: "In about a week, tiny green leaves will pop up."'
        },
        {
          id: 'rd-m4-t1-q6',
          kind: 'inference',
          prompt: 'What could happen if you poured a lot of water in fast?',
          choices: [
            'The basil would grow faster',
            'The pot would turn green',
            'The seeds could wash away',
            'The sun would go down'
          ],
          answer: 2,
          feedback: [
            'The passage warns against it.',
            'The passage does not say that.',
            null,
            'Water cannot change the sun.'
          ],
          why: 'It says too much water, too fast, will wash the seeds away.'
        }
      ]
    },
    {
      id: 'rd-m4-t2',
      module: 4,
      week: 8,
      kind: 'weekly',
      readAloud: false,
      title: 'The Sunflower’s Year',
      text: `In spring, Marcus planted one sunflower seed by the fence.

In a week, a sprout came up. It had two round leaves.

By early summer, the plant was as tall as Marcus. Its stem was thick and rough. Its leaves were as big as his hand.

In the middle of summer, a huge bud opened. It became a yellow flower, wider than a dinner plate. Bees came all day long.

In the fall, the yellow petals dropped off. The middle of the flower was packed with seeds. It was so full there was no room left. Birds came to eat them.

Marcus saved a handful of seeds before the birds got them all. Next spring, he will plant them by the fence.`,
      questions: [
        {
          id: 'rd-m4-t2-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'How birds find food',
            'A sunflower’s life over one year',
            'How to build a fence',
            'Why Marcus likes bees'
          ],
          answer: 1,
          feedback: [
            'Birds come near the end. That is one detail.',
            null,
            'The fence is only where the seed is planted.',
            'The story does not say he likes bees.'
          ],
          why: 'It follows the plant from spring to fall, season by season.'
        },
        {
          id: 'rd-m4-t2-q2',
          kind: 'word',
          prompt: '"The middle of the flower was packed with seeds." What does packed mean?',
          choices: ['Empty', 'Wrapped in paper', 'Wet', 'Very full'],
          answer: 3,
          feedback: [
            'The next sentence says there was no room left.',
            'Nothing is wrapped.',
            'The story does not say that.',
            null
          ],
          why: 'The next sentence says: "It was so full there was no room left."'
        },
        {
          id: 'rd-m4-t2-q3',
          kind: 'detail',
          prompt: 'When did the big yellow flower open?',
          choices: [
            'In spring',
            'In early summer',
            'In the middle of summer',
            'In the fall'
          ],
          answer: 2,
          feedback: [
            'In spring, Marcus planted the seed.',
            'In early summer, it was as tall as Marcus.',
            null,
            'In the fall, the petals dropped off.'
          ],
          why: 'It says: "In the middle of summer, a huge bud opened."'
        },
        {
          id: 'rd-m4-t2-q4',
          kind: 'detail',
          prompt: 'How tall was the plant by early summer?',
          choices: [
            'As tall as Marcus',
            'As tall as the house',
            'As small as his hand',
            'As tall as a dinner plate'
          ],
          answer: 0,
          feedback: [
            null,
            'Read the third paragraph again.',
            'His hand is the size of a leaf.',
            'The plate is how wide the flower was.'
          ],
          why: 'It says: "the plant was as tall as Marcus."'
        },
        {
          id: 'rd-m4-t2-q5',
          kind: 'detail',
          prompt: 'Who came to eat the seeds?',
          choices: ['Bees', 'Marcus', 'A dog', 'Birds'],
          answer: 3,
          feedback: [
            'Bees came to the flower in summer.',
            'He saved seeds to plant, not to eat.',
            'There is no dog in the story.',
            null
          ],
          why: 'It says: "Birds came to eat them."'
        },
        {
          id: 'rd-m4-t2-q6',
          kind: 'inference',
          prompt: 'Why did Marcus save a handful of seeds?',
          choices: [
            'To feed the birds later',
            'So he can grow new sunflowers next spring',
            'To give them to the bees',
            'To fix the fence'
          ],
          answer: 1,
          feedback: [
            'He saved them BEFORE the birds got them all.',
            null,
            'Bees do not eat seeds in this story.',
            'Seeds cannot fix a fence.'
          ],
          why: 'The last line says he will plant them by the fence next spring.'
        }
      ]
    }
  ],
  quarterTest: {
    id: 'rd-q1-exam',
    quarter: 1,
    kind: 'quarter',
    readAloud: false,
    parts: [
      {
        id: 'rd-q1-exam-p1',
        title: 'The Scarecrow’s Side',
        text: `I stand in the middle of the corn. I have a straw hat and a coat with holes. I do not move. I cannot.

The farmer put me here to scare the crows away. He thinks it works.

Here is the truth. The crows are not scared of me at all. They land on my arms. They sit on my hat. One of them, the big black one, tells me all the news.

When the farmer comes out, the crows fly up and away. He looks at me and nods. "Good job," he says.

I say nothing. I cannot talk to people. But I think the crows are my friends.`,
        questions: [
          {
            id: 'rd-q1-exam-p1-q1',
            kind: 'main',
            prompt: 'What is this story mostly about?',
            choices: [
              'How to grow corn',
              'How to make a straw hat',
              'A farmer who talks to birds',
              'A scarecrow who is really friends with the crows'
            ],
            answer: 3,
            feedback: [
              'The corn is only where the scarecrow stands.',
              'The hat is one small detail.',
              'The farmer talks to the scarecrow.',
              null
            ],
            why: 'The scarecrow tells the truth: the crows are not scared, and they are his friends.'
          },
          {
            id: 'rd-q1-exam-p1-q2',
            kind: 'word',
            prompt: '"Here is the truth." What does truth mean?',
            choices: ['A made-up story', 'What really happens', 'A kind of bird', 'A joke'],
            answer: 1,
            feedback: [
              'That is the opposite.',
              null,
              'The birds are crows.',
              'He is telling what is real.'
            ],
            why: 'Right after it, he tells what really happens: the crows are not scared.'
          },
          {
            id: 'rd-q1-exam-p1-q3',
            kind: 'detail',
            prompt: 'What does the scarecrow wear?',
            choices: [
              'A straw hat and a coat with holes',
              'A red hood',
              'A crown',
              'Nothing at all'
            ],
            answer: 0,
            feedback: [
              null,
              'That is a different story.',
              'Nobody has a crown here.',
              'Read the first paragraph.'
            ],
            why: 'It says: "I have a straw hat and a coat with holes."'
          },
          {
            id: 'rd-q1-exam-p1-q4',
            kind: 'detail',
            prompt: 'Where do the crows sit?',
            choices: [
              'On the farmer',
              'Only on the ground',
              'On his arms and his hat',
              'On the barn'
            ],
            answer: 2,
            feedback: [
              'The crows fly away from the farmer.',
              'Read the third paragraph.',
              null,
              'There is no barn in the story.'
            ],
            why: 'It says: "They land on my arms. They sit on my hat."'
          },
          {
            id: 'rd-q1-exam-p1-q5',
            kind: 'inference',
            prompt: 'Who is telling this story?',
            choices: ['The farmer', 'The scarecrow', 'The big black crow', 'The corn'],
            answer: 1,
            feedback: [
              'The teller talks about the farmer as "he".',
              null,
              'The crow tells the news, but not this story.',
              'The corn does not talk.'
            ],
            why: 'The teller stands in the corn and wears a straw hat, and does not move.'
          },
          {
            id: 'rd-q1-exam-p1-q6',
            kind: 'inference',
            prompt: 'Why does the farmer think the scarecrow works?',
            choices: [
              'The scarecrow told him',
              'The crows told him',
              'The corn is all gone',
              'The crows fly away every time he comes out'
            ],
            answer: 3,
            feedback: [
              'The scarecrow cannot talk to people.',
              'The crows only talk to the scarecrow.',
              'The story does not say that.',
              null
            ],
            why: 'He only sees the crows leave. He never sees them sitting on the hat.'
          }
        ]
      },
      {
        id: 'rd-q1-exam-p2',
        title: 'What Roots Do',
        text: `Roots are the part of a plant you do not see. They grow under the ground. But they do three big jobs.

First, roots hold the plant in place. When the wind blows hard, the roots keep the plant from blowing over.

Second, roots drink. They take in water from the soil. They send it up the stem to the leaves.

Third, some roots store food. Store means to keep it for later. A carrot is a root. So is a sweet potato.

Roots also hold the soil. When rain falls hard, the roots keep the dirt from washing away.

So the next time you see a plant, think about the part you cannot see.`,
        questions: [
          {
            id: 'rd-q1-exam-p2-q1',
            kind: 'main',
            prompt: 'What is this passage mostly about?',
            choices: [
              'The jobs that roots do',
              'How to cook a carrot',
              'Why wind blows hard',
              'How leaves drink rain'
            ],
            answer: 0,
            feedback: [
              null,
              'Nobody cooks in this passage.',
              'Wind is one example.',
              'The roots do the drinking.'
            ],
            why: 'It says roots "do three big jobs," and then names them.'
          },
          {
            id: 'rd-q1-exam-p2-q2',
            kind: 'word',
            prompt: '"Some roots store food." What does store mean?',
            choices: ['Sell it in a shop', 'Throw it away', 'Keep it for later', 'Cook it'],
            answer: 2,
            feedback: [
              'That is a different kind of store.',
              'The root holds on to it.',
              null,
              'Nothing is cooked.'
            ],
            why: 'The passage says: "Store means to keep it for later."'
          },
          {
            id: 'rd-q1-exam-p2-q3',
            kind: 'detail',
            prompt: 'Where do roots send the water they drink?',
            choices: [
              'Down into the rocks',
              'Into the carrot only',
              'Out into the wind',
              'Up the stem to the leaves'
            ],
            answer: 3,
            feedback: [
              'They send it up.',
              'Read the third paragraph.',
              'Read the third paragraph.',
              null
            ],
            why: 'It says: "They send it up the stem to the leaves."'
          },
          {
            id: 'rd-q1-exam-p2-q4',
            kind: 'detail',
            prompt: 'Which of these is a root?',
            choices: ['A leaf', 'A carrot', 'A flower', 'A stem'],
            answer: 1,
            feedback: [
              'Leaves are above the ground.',
              null,
              'Flowers are above the ground.',
              'The stem carries the water up.'
            ],
            why: 'It says: "A carrot is a root."'
          },
          {
            id: 'rd-q1-exam-p2-q5',
            kind: 'detail',
            prompt: 'What do roots keep from washing away in hard rain?',
            choices: ['The leaves', 'The wind', 'The dirt', 'The sun'],
            answer: 2,
            feedback: [
              'Read the fifth paragraph.',
              'Wind cannot wash away.',
              null,
              'Read the fifth paragraph.'
            ],
            why: 'It says: "the roots keep the dirt from washing away."'
          },
          {
            id: 'rd-q1-exam-p2-q6',
            kind: 'inference',
            prompt: 'What could happen to a plant with very short roots on a windy day?',
            choices: [
              'It could blow over',
              'It would grow faster',
              'It would turn into a carrot',
              'Nothing at all'
            ],
            answer: 0,
            feedback: [
              null,
              'The passage says roots hold the plant in place.',
              'Short roots do not make carrots.',
              'Roots are what keep it standing.'
            ],
            why: 'Roots keep the plant from blowing over. Short roots cannot hold it as well.'
          }
        ]
      }
    ]
  }
};

export default READING_M4;
