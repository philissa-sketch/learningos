// ---------------------------------------------------------------------------
// READING & LITERATURE — MODULE 3 · WHERE PEOPLE LIVE · Quarter 1, weeks 5–6
//
// Informational and story passages built for comparing: two or three things
// set side by side, the same questions asked of each. Khan names its unit
// "Rural, Suburban, Urban"; this module's title keeps the long words out of
// the heading she reads first. Blueprint: claude/reading-course-blueprint.md.
//
// Lessons 1 and 2 reuse read-ela2-u3-p1 and -p2 (data/reading/ela2Unit3.js).
// ⚠️ -p2 ends "Three girls." while one of the three is Ben. Flagged to Gigi
// Sept 23 2026, not changed here — it is her existing content.
//
// ---- FACTS, CHECKED ----
// Houses built for weather: stilts keep a house above flood water; thick
// mud-brick walls keep a house cool in hot, dry places; steep roofs let heavy
// snow slide off. All three are real, widely used building choices.
//
// Thursday tests have no read-aloud (Gigi, Sept 23 2026). Measured by
// analyse() against the Quarter 1 cap: 11 words a sentence, 6% long words.
// ---------------------------------------------------------------------------

export const READING_M3 = {
  id: 'rd-m3',
  module: 3,
  quarter: 1,
  title: 'Where People Live',
  genre: 'informational',
  skill: 'comparing — how things are the same and different',
  khanWatch: {
    course: 'ela2',
    unit: 3,
    note: 'Optional. Khan’s own unit, “Rural, Suburban, Urban”.'
  },
  book: {
    title: 'If You Lived Here: Houses of the World',
    author: 'Giles Laroche',
    illustrator: 'Giles Laroche',
    publisher: 'Houghton Mifflin Harcourt, 2011',
    ages: 'Ages 6–9 (retail listing)',
    note: 'Sixteen kinds of homes, including houses on stilts, and why each is built the way it is.',
    verifiedOn: '2026-09-23',
    source: 'https://www.gileslaroche.com/ifYouLivedHere.html'
  },
  lessons: [
    {
      id: 'rd-m3-01',
      module: 3,
      week: 5,
      day: 1,
      reuses: 'read-ela2-u3-p1',
      title: 'Three Places to Live'
    },
    {
      id: 'rd-m3-02',
      module: 3,
      week: 5,
      day: 2,
      reuses: 'read-ela2-u3-p2',
      title: 'The Same Day, Three Ways'
    },
    {
      id: 'rd-m3-03',
      module: 3,
      week: 5,
      day: 3,
      title: 'Two Gardens',
      skill: 'comparing',
      text: `Aunt June has a garden on a farm. Her cousin Dee has a garden on a roof in the city. Both of them grow herbs.

Aunt June has lots of land. She plants long rows of basil and mint in the ground. She uses a hose to water them.

Dee has no ground at all. She grows her herbs in pots and boxes on the roof. She carries water up the stairs in a can.

On the farm, the wind blows across open fields. On the roof, tall buildings block some of the sun. Dee has to move her pots to find the light.

The gardens look very different. But in both of them, the plants need the same three things: sun, water and good soil.`,
      questions: [
        {
          id: 'rd-m3-03-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How a farm garden and a roof garden are alike and different',
            'How to carry water up the stairs',
            'Why wind blows on a farm',
            'How to cook with basil'
          ],
          answer: 0,
          feedback: [
            null,
            'That is one thing Dee does.',
            'Wind is one small detail.',
            'Nobody cooks in this passage.'
          ],
          why: 'The passage puts the two gardens side by side, then says what they share.'
        },
        {
          id: 'rd-m3-03-q2',
          kind: 'word',
          prompt: '"Tall buildings block some of the sun." What does block mean?',
          choices: [
            'Make it hotter',
            'Build it up',
            'Paint it',
            'Stop it from getting through'
          ],
          answer: 3,
          feedback: [
            'The next sentence says Dee must look for light.',
            'The buildings are already built.',
            'Nothing is painted.',
            null
          ],
          why: 'Dee has to move her pots to find the light, because the buildings are in the way.'
        },
        {
          id: 'rd-m3-03-q3',
          kind: 'detail',
          prompt: 'How does Dee water her herbs?',
          choices: [
            'With a long hose',
            'She carries water up the stairs in a can',
            'She waits for rain',
            'A pipe on the roof'
          ],
          answer: 1,
          feedback: [
            'That is Aunt June.',
            null,
            'The passage does not say that.',
            'No pipe is named.'
          ],
          why: 'It says she "carries water up the stairs in a can."'
        },
        {
          id: 'rd-m3-03-q4',
          kind: 'inference',
          prompt: 'What do both gardens have in common?',
          choices: [
            'They both have long rows',
            'They are both on a roof',
            'The plants need sun, water and good soil',
            'They both use a hose'
          ],
          answer: 2,
          feedback: [
            'Only the farm has rows.',
            'Only Dee’s is on a roof.',
            null,
            'Only Aunt June uses a hose.'
          ],
          why: 'The last paragraph says in both of them the plants need the same three things.'
        }
      ]
    },
    {
      id: 'rd-m3-04',
      module: 3,
      week: 6,
      day: 1,
      title: 'Getting Around',
      skill: 'comparing',
      text: `How do you get to the store? It depends on where you live.

On a farm, the store may be many miles away. Most people drive. Some farm families go to town just once a week and buy a lot at one time.

In a city, the store may be down the street. Lots of people walk. Others take a bus or a train that runs under the ground. Some people in a city do not own a car at all.

In a suburb, the store is often a short drive away. Some people drive. Some ride a bike. Some take a bus.

Each place has a way that works best. The farther the store is, the more a car helps.`,
      questions: [
        {
          id: 'rd-m3-04-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'What to buy at the store',
            'How trains run under the ground',
            'How people get to the store in different places',
            'Why people like to ride bikes'
          ],
          answer: 2,
          feedback: [
            'The passage never lists what people buy.',
            'That is one detail about the city.',
            null,
            'Bikes are one small detail.'
          ],
          why: 'The first line asks how you get to the store, and each paragraph answers for one place.'
        },
        {
          id: 'rd-m3-04-q2',
          kind: 'word',
          prompt: '"The store may be many miles away." What are miles?',
          choices: [
            'A way to measure a long distance',
            'A kind of store',
            'A kind of car',
            'Days of the week'
          ],
          answer: 0,
          feedback: [
            null,
            'It tells how far the store is.',
            'It tells how far, not how you go.',
            'Days are a different thing.'
          ],
          why: '"Many miles away" tells how far. That is why most farm people drive.'
        },
        {
          id: 'rd-m3-04-q3',
          kind: 'detail',
          prompt: 'How do some farm families shop?',
          choices: [
            'They walk to the store every day',
            'They take a train under the ground',
            'They never go to a store',
            'They go once a week and buy a lot at one time'
          ],
          answer: 3,
          feedback: [
            'The store is too far to walk.',
            'That is in the city.',
            'They go once a week.',
            null
          ],
          why: 'It says some go "just once a week and buy a lot at one time."'
        },
        {
          id: 'rd-m3-04-q4',
          kind: 'inference',
          prompt: 'Why do some people in a city not own a car?',
          choices: [
            'Cars are not allowed in cities',
            'The store is close, and there are buses and trains',
            'They live on a farm',
            'The roads are made of dirt'
          ],
          answer: 1,
          feedback: [
            'The passage does not say that.',
            null,
            'This is about the city.',
            'The passage does not say that.'
          ],
          why: 'In the city the store may be down the street, and buses and trains run.'
        }
      ]
    },
    {
      id: 'rd-m3-05',
      module: 3,
      week: 6,
      day: 2,
      title: 'Houses Made for the Weather',
      skill: 'comparing',
      text: `People build homes to fit the weather where they live.

Some people live near rivers that flood. When heavy rain comes, the water rises. So they build their houses on stilts. The stilts are tall poles. They hold the house up high, above the water.

Some people live where it is hot and dry. They build with thick walls of mud brick. Thick walls keep the hot air out. Inside, the house stays cool.

Some people live where lots of snow falls. They build roofs that are steep, like the side of a hill. The heavy snow slides right off. A flat roof could hold too much snow and break.

Three places. Three kinds of weather. Three smart ways to build.`,
      questions: [
        {
          id: 'rd-m3-05-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How to make mud brick',
            'How people build homes to fit their weather',
            'Why rivers flood',
            'How to play in the snow'
          ],
          answer: 1,
          feedback: [
            'Mud brick is named, but not how to make it.',
            null,
            'Floods are one of three examples.',
            'Snow is about the roof, not playing.'
          ],
          why: 'The first line says it, and then three places show it.'
        },
        {
          id: 'rd-m3-05-q2',
          kind: 'word',
          prompt: 'What are stilts?',
          choices: [
            'Thick walls',
            'Steep roofs',
            'Tall poles that hold a house up high',
            'Heavy rain'
          ],
          answer: 2,
          feedback: [
            'That is the hot, dry place.',
            'That is the snowy place.',
            null,
            'Rain is what makes the water rise.'
          ],
          why: 'It says: "The stilts are tall poles. They hold the house up high."'
        },
        {
          id: 'rd-m3-05-q3',
          kind: 'detail',
          prompt: 'What do thick mud walls do?',
          choices: [
            'Keep the hot air out',
            'Hold up the snow',
            'Keep the water out',
            'Make the house taller'
          ],
          answer: 0,
          feedback: [
            null,
            'That is about roofs.',
            'That is what stilts help with.',
            'Stilts make a house taller.'
          ],
          why: 'It says: "Thick walls keep the hot air out."'
        },
        {
          id: 'rd-m3-05-q4',
          kind: 'inference',
          prompt: 'Which home would work best in a place with lots of snow?',
          choices: [
            'A home with a flat roof',
            'A home on stilts',
            'A home with no roof',
            'A home with a steep roof'
          ],
          answer: 3,
          feedback: [
            'The passage says a flat roof could break.',
            'Stilts are for flood water.',
            'Every home needs a roof.',
            null
          ],
          why: 'Snow slides right off a steep roof.'
        }
      ]
    },
    {
      id: 'rd-m3-06',
      module: 3,
      week: 6,
      day: 3,
      title: 'Nana’s Street, Then and Now',
      skill: 'comparing',
      text: `When Nana was nine, her street was a dirt road. Cows lived in the field across the way. At night it was so dark you could see every star.

Nana walked Imani down that same street last week. It is not a dirt road now. It is smooth and black, with lines painted down the middle.

The cow field is gone. In its place is a school and a row of houses. Street lights come on when the sun goes down.

"Do you miss the cows?" Imani asked.

Nana smiled. "Some days. But look. The big oak tree is still here. I climbed it when I was your age."

Some things change. Some things stay the same.`,
      questions: [
        {
          id: 'rd-m3-06-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How to climb an oak tree',
            'How cows find food',
            'How to paint lines on a road',
            'How Nana’s street has changed, and what stayed the same'
          ],
          answer: 3,
          feedback: [
            'Nana climbed it long ago. That is one detail.',
            'The cows are gone.',
            'The lines are one small detail.',
            null
          ],
          why: 'It puts the street then and now side by side, and ends with what did not change.'
        },
        {
          id: 'rd-m3-06-q2',
          kind: 'word',
          prompt: '"It is smooth and black." What does smooth mean?',
          choices: ['Very dark', 'Flat, with no bumps', 'Made of dirt', 'Very old'],
          answer: 1,
          feedback: [
            'Black already tells us it is dark.',
            null,
            'It is NOT a dirt road now.',
            'The road is new.'
          ],
          why: 'The road is not dirt any more. It is flat and even.'
        },
        {
          id: 'rd-m3-06-q3',
          kind: 'detail',
          prompt: 'What is in the old cow field now?',
          choices: [
            'A school and a row of houses',
            'An oak tree',
            'A dirt road',
            'More cows'
          ],
          answer: 0,
          feedback: [
            null,
            'The oak tree is a different thing that stayed.',
            'The road is not dirt now.',
            'The cows are gone.'
          ],
          why: 'It says: "In its place is a school and a row of houses."'
        },
        {
          id: 'rd-m3-06-q4',
          kind: 'inference',
          prompt: 'Why can you not see every star on the street now?',
          choices: [
            'The oak tree is in the way',
            'The stars have moved away',
            'The street lights make it bright at night',
            'The road is black'
          ],
          answer: 2,
          feedback: [
            'One tree cannot hide the whole sky.',
            'The stars did not move.',
            null,
            'The road color does not hide stars.'
          ],
          why: 'Then it was so dark you could see every star. Now street lights come on at night.'
        }
      ]
    }
  ],
  tests: [
    {
      id: 'rd-m3-t1',
      module: 3,
      week: 5,
      kind: 'weekly',
      readAloud: false,
      title: 'Two Places to Shop',
      text: `Every Saturday, Grandpa takes Kiara to the farm market. It is in a big field. Farmers park their trucks in a line and sell from the back.

There are tomatoes, beans and bunches of herbs. The farmers grew them all. Kiara can ask the farmer how each one was grown.

On Monday, Kiara goes to the corner shop with her dad. It is a small store in the city, next to their home. It is open every day, even late at night.

The corner shop sells milk, bread and a few apples. The food comes from far away on big trucks.

The market is only there on Saturday. The shop is there every day. Kiara likes them both.`,
      questions: [
        {
          id: 'rd-m3-t1-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How farmers drive trucks',
            'Two different places where Kiara gets food',
            'Why Kiara likes apples',
            'What Grandpa grows'
          ],
          answer: 1,
          feedback: [
            'Trucks are one small detail.',
            null,
            'Apples are only named once.',
            'The farmers grow the food, not Grandpa.'
          ],
          why: 'It tells about the farm market and the corner shop, side by side.'
        },
        {
          id: 'rd-m3-t1-q2',
          kind: 'word',
          prompt: '"Farmers sell from the back." The back of what?',
          choices: ['The corner shop', 'The field', 'Grandpa’s house', 'Their trucks'],
          answer: 3,
          feedback: [
            'The shop is a different place.',
            'The trucks are in the field.',
            'Grandpa’s house is not in the story.',
            null
          ],
          why: 'The sentence before it says the farmers park their trucks in a line.'
        },
        {
          id: 'rd-m3-t1-q3',
          kind: 'detail',
          prompt: 'When is the farm market open?',
          choices: ['Every day', 'On Monday', 'On Saturday', 'Only at night'],
          answer: 2,
          feedback: [
            'That is the corner shop.',
            'On Monday Kiara goes to the corner shop.',
            null,
            'The shop is open late at night.'
          ],
          why: 'It says: "The market is only there on Saturday."'
        },
        {
          id: 'rd-m3-t1-q4',
          kind: 'detail',
          prompt: 'Where does the food in the corner shop come from?',
          choices: [
            'From far away on big trucks',
            'From the farmers in the field',
            'From Kiara’s garden',
            'From the back of the shop'
          ],
          answer: 0,
          feedback: [
            null,
            'That is the market.',
            'Kiara has no garden in this story.',
            'Read the fourth paragraph.'
          ],
          why: 'It says: "The food comes from far away on big trucks."'
        },
        {
          id: 'rd-m3-t1-q5',
          kind: 'detail',
          prompt: 'Who takes Kiara to the corner shop?',
          choices: ['Grandpa', 'A farmer', 'She goes alone', 'Her dad'],
          answer: 3,
          feedback: [
            'Grandpa takes her to the market.',
            'Farmers are at the market.',
            'Someone goes with her.',
            null
          ],
          why: 'It says: "Kiara goes to the corner shop with her dad."'
        },
        {
          id: 'rd-m3-t1-q6',
          kind: 'inference',
          prompt: 'Where could Kiara find out how her beans were grown?',
          choices: [
            'At the corner shop',
            'At the farm market',
            'On a big truck',
            'At her home'
          ],
          answer: 1,
          feedback: [
            'That food comes from far away.',
            null,
            'You cannot ask a truck.',
            'Nobody there grew the beans.'
          ],
          why: 'At the market, she can ask the farmer who grew them.'
        }
      ]
    },
    {
      id: 'rd-m3-t2',
      module: 3,
      week: 6,
      kind: 'weekly',
      readAloud: false,
      title: 'A Park in the Middle',
      text: `Jada lives in a big city. Tall buildings stand on every side of her home. But in the middle of the city there is a park.

The park has grass, trees and a pond. Ducks swim in the pond. Birds sing in the trees. Jada likes to sit on the bench and read.

Her friend Theo lives in the country. He has fields and woods all around his house. He does not need a park. He can walk out his back door and be in the trees.

When Theo came to visit, Jada took him to the park. "It is like a little piece of the country," he said.

A city park gives people a place to rest. It gives birds and ducks a home too.`,
      questions: [
        {
          id: 'rd-m3-t2-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'A city park, and how it is like the country',
            'How ducks learn to swim',
            'Theo’s back door',
            'How tall buildings are made'
          ],
          answer: 0,
          feedback: [
            null,
            'The ducks are one small detail.',
            'The door is one small detail.',
            'The passage does not say how.'
          ],
          why: 'It tells about Jada’s park and compares it to Theo’s country home.'
        },
        {
          id: 'rd-m3-t2-q2',
          kind: 'word',
          prompt: 'What is the country, in this passage?',
          choices: [
            'A place full of tall buildings',
            'A bench in the park',
            'A place with fields and woods, away from the city',
            'A kind of pond'
          ],
          answer: 2,
          feedback: [
            'That is the city.',
            'The bench is where Jada reads.',
            null,
            'The pond is in the park.'
          ],
          why: 'Theo lives in the country, with fields and woods all around.'
        },
        {
          id: 'rd-m3-t2-q3',
          kind: 'detail',
          prompt: 'What does Jada like to do in the park?',
          choices: [
            'Swim in the pond',
            'Sit on the bench and read',
            'Climb the tall buildings',
            'Feed the ducks'
          ],
          answer: 1,
          feedback: [
            'The ducks swim.',
            null,
            'The buildings are around the park.',
            'The passage does not say that.'
          ],
          why: 'It says: "Jada likes to sit on the bench and read."'
        },
        {
          id: 'rd-m3-t2-q4',
          kind: 'detail',
          prompt: 'What does Theo have all around his house?',
          choices: [
            'Tall buildings',
            'A pond with ducks',
            'A city park',
            'Fields and woods'
          ],
          answer: 3,
          feedback: [
            'That is Jada’s home.',
            'That is in the park.',
            'Theo does not need a park.',
            null
          ],
          why: 'It says: "He has fields and woods all around his house."'
        },
        {
          id: 'rd-m3-t2-q5',
          kind: 'detail',
          prompt: 'Who lives in the pond?',
          choices: ['Ducks', 'Fish only', 'Theo', 'Frogs'],
          answer: 0,
          feedback: [
            null,
            'Fish are not named.',
            'Theo lives in the country.',
            'Frogs are not named.'
          ],
          why: 'It says: "Ducks swim in the pond."'
        },
        {
          id: 'rd-m3-t2-q6',
          kind: 'inference',
          prompt: 'Why does Theo not need a park?',
          choices: [
            'He does not like ducks',
            'He already has trees right outside his door',
            'He lives in a tall building',
            'Parks are only for Jada'
          ],
          answer: 1,
          feedback: [
            'The passage does not say that.',
            null,
            'He lives in the country.',
            'Parks are for everyone.'
          ],
          why: 'He can walk out his back door and be in the trees.'
        }
      ]
    }
  ]
};

export default READING_M3;
