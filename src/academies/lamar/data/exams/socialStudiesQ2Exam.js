// ---------------------------------------------------------------------------
// Social Studies Q2 2026-2027 Quarterly Cumulative Exam
//
// Same confirmed assessment framework as every other quarterly exam in this
// app (see docs/PROJECT_LOG.md): covers ONLY material actually taught in
// this quarter's 8 Mission-Control-built lessons — Geography of Africa,
// Geography of Southwest Asia & Southern/Eastern Asia, Government &
// Political Systems (Israel/Saudi Arabia/Turkey, Sharia law, China/India),
// and Economics (economic systems, trade, OPEC, economic growth, personal
// money management). This exam does NOT cover the parallel Khan Academy
// World History content (Empires and Belief Systems, etc.) seeded in
// useAppStore.js — that content has no in-app quiz layer of its own (Khan
// Academy grades it directly), so it isn't testable here. Per the user's
// confirmed decision, Q3 and Q4 rely on Khan Academy alone with no further
// Mission Control lessons or exams planned for those quarters — this is the
// final Social Studies quarterly exam for the 2026-2027 school year.
//
// ARCHITECTURE NOTE: same pattern as every other quarterly exam — no
// `novaIntro`, `isQuarterlyExam: true`, `unlocksAfter` listing all 8 real
// Q2 lesson ids so the Roster/gating logic requires them completed first.
//
// Format: 24 items (within the 20-25 range) — 3 questions per lesson,
// cumulative across the full quarter.
// ---------------------------------------------------------------------------

export const socialStudiesQ2Exam = {
  id: 'exam-socialStudies-q2-2026-2027',
  subject: 'socialStudies',
  tier: 1,
  // RE-QUARTERED Aug 6, 2026 at the parent's instruction: Genealogy moved to
  // Q2 on its own, and this Geography/Government/Economics block moved from
  // Q2 to Q3. The `id` deliberately still says "q2" — a lesson/exam id is the
  // stable key every recorded attempt is stored against, and renaming it
  // would orphan real student progress. Same rule the Academic Success
  // Center follows for slotIds. Only the quarter and title move.
  quarter: 'Q3 2026-2027',
  title: 'Quarterly Exam — Geography, Government & Economics (Q3)',
  theme: 'Cumulative exam covering Geography of Africa & Asia, Government & Political Systems, and Economics across Africa, Southwest Asia, and Southern & Eastern Asia',
  isQuarterlyExam: true,
  unlocksAfter: [
    'ss7-geography-of-africa', 'ss7-geography-of-africa-2',
    'ss7-geography-of-southwest-asia', 'ss7-geography-of-southwest-asia-2',
    'ss7-government-political-systems', 'ss7-sharia-law-comparative-government',
    'ss7-economic-systems-trade', 'ss7-economic-growth-money-management'
  ],
  questions: [
    {
      id: 'q1',
      type: 'choice',
      prompt: 'What is the Sahel?',
      choices: [
        'A semi-arid transition zone between the Sahara Desert and the wetter savanna to the south',
        'A river that flows through Egypt',
        'A mountain range in South Africa',
        'A rainforest located in East Asia'
      ],
      answer: 0,
      explanation: 'The Sahel is a semi-arid transition zone between the Sahara Desert and the wetter savanna to the south.',
      choiceFeedback: [null, 'This describes the Nile, not the Sahel.', 'This describes the Atlas or Drakensberg region, not the Sahel.', 'The Sahel is in Africa, not East Asia.'],
      xp: 10
    },
    {
      id: 'q2',
      type: 'choice',
      prompt: 'True or False: The Sahara is the largest hot desert in the world.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — the Sahara is the largest hot desert in the world, covering most of North Africa.',
      choiceFeedback: [null, 'This is a real, well-documented fact — the statement as written is True.'],
      xp: 10
    },
    {
      id: 'q3',
      type: 'choice',
      prompt: 'Why were the Trans-Saharan trade routes historically significant for Africa?',
      choices: [
        'They connected West Africa to North Africa and the Mediterranean world, moving gold, salt, and other goods across the desert',
        'They were used only for modern tourism, with no historical trade role',
        'They connected Africa to South America across the Atlantic',
        'They had no real economic or historical significance'
      ],
      answer: 0,
      explanation: 'The Trans-Saharan trade routes connected West Africa to North Africa and the Mediterranean world, moving gold, salt, and other goods across the desert.',
      choiceFeedback: [null, 'These routes had a real, major historical trade role, long before modern tourism.', 'These routes crossed the Sahara, connecting African regions, not the Atlantic.', 'These routes had real, well-documented economic and historical significance.'],
      xp: 10
    },
    {
      id: 'q4',
      type: 'choice',
      prompt: 'What makes the Strait of Hormuz strategically important in global energy markets?',
      choices: [
        'A huge share of the world\'s oil shipping must pass through this one narrow, critical waterway',
        'It is the site of the largest gold mine in the world',
        'It is a major internet data cable hub, unrelated to oil',
        'It has no real strategic or economic importance'
      ],
      answer: 0,
      explanation: 'The Strait of Hormuz is strategically important because a huge share of the world\'s oil shipping must pass through this one narrow waterway.',
      choiceFeedback: [null, 'Its real strategic significance is tied to oil shipping, not gold mining.', 'Its real strategic importance is tied to oil shipping routes, not internet infrastructure.', 'It has real, well-documented, major strategic and economic importance.'],
      xp: 10
    },
    {
      id: 'q5',
      type: 'choice',
      prompt: 'True or False: The Fertile Crescent, including the Tigris and Euphrates Rivers, is located in Southwest Asia.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — the Fertile Crescent, including the Tigris and Euphrates Rivers, is located in Southwest Asia (the Middle East).',
      choiceFeedback: [null, 'This is a real, well-documented fact — the statement as written is True.'],
      xp: 10
    },
    {
      id: 'q6',
      type: 'choice',
      prompt: 'Why do the Himalayas function like a "water tower" for Southern and Eastern Asia?',
      choices: [
        'Their glaciers and snowmelt feed major rivers that travel thousands of miles to reach hundreds of millions of people',
        'They have no connection to any river system at all',
        'They only provide water to people living directly on the mountains',
        'They block all rainfall from reaching the region'
      ],
      answer: 0,
      explanation: "The Himalayas' glaciers and snowmelt feed major rivers that travel thousands of miles, sustaining a huge downstream population.",
      choiceFeedback: [null, 'The Himalayas have a real, direct connection to several major river systems.', 'These rivers travel thousands of miles, reaching populations far beyond the mountains themselves.', 'The Himalayas are a real water source via glaciers and monsoon rainfall, not a rainfall blocker.'],
      xp: 10
    },
    {
      id: 'q7',
      type: 'choice',
      prompt: 'What real government type does Israel have?',
      choices: [
        'A parliamentary democracy, where citizens vote for parties and the Knesset selects the Prime Minister',
        'An autocratic monarchy with no elections',
        'A presidential system where citizens vote directly for a president',
        'A system with no government at all'
      ],
      answer: 0,
      explanation: 'Israel is a parliamentary democracy — citizens vote for parties for the Knesset, which then selects the Prime Minister.',
      choiceFeedback: [null, 'Israel holds real elections for its Knesset — it is a democracy, not a monarchy.', 'This describes Turkey\'s system since 2018, not Israel\'s.', 'Israel has a real, functioning parliamentary government with regular elections.'],
      xp: 10
    },
    {
      id: 'q8',
      type: 'choice',
      prompt: 'What real government type does Saudi Arabia have?',
      choices: [
        'An autocratic monarchy, where the King holds power inherited within the royal family, with no direct citizen vote for the leader',
        'A parliamentary democracy identical to Israel\'s',
        'A presidential system with direct elections',
        'A system with no head of state'
      ],
      answer: 0,
      explanation: 'Saudi Arabia is an autocratic monarchy — the King\'s position is inherited within the royal family, with no direct citizen vote for the country\'s leader.',
      choiceFeedback: [null, 'Saudi Arabia\'s system is fundamentally different from Israel\'s.', 'Saudi Arabia has no presidential elections — power passes within the royal family.', 'Saudi Arabia has a clear head of state — the King — just not one chosen through elections.'],
      xp: 10
    },
    {
      id: 'q9',
      type: 'choice',
      prompt: 'True or False: In 2018, Turkey shifted from a parliamentary system to a presidential system, abolishing the office of prime minister.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — in 2018, Turkey shifted from a parliamentary system to a presidential system, abolishing the office of prime minister.',
      choiceFeedback: [null, 'This is a real, well-documented constitutional change — the statement as written is True.'],
      xp: 10
    },
    {
      id: 'q10',
      type: 'choice',
      prompt: "How does Iran's government structurally differ from Saudi Arabia's?",
      choices: [
        'Iran combines a religious Supreme Leader with a real elected presidency; Saudi Arabia has one absolute authority (the King) with no elected check',
        'The two systems are completely identical',
        'Saudi Arabia has an elected president while Iran has an absolute king',
        'Neither country has any religious influence in government'
      ],
      answer: 0,
      explanation: "Iran combines a religious Supreme Leader with a real elected presidency, while Saudi Arabia's monarchy has no elected check — a genuine structural difference.",
      choiceFeedback: [null, 'These are genuinely different structures, despite sharing a broad religious legal tradition.', 'This reverses the real facts.', 'Both countries have real, documented, significant religious influence in government.'],
      xp: 10
    },
    {
      id: 'q11',
      type: 'choice',
      prompt: 'What kind of government system does China have?',
      choices: [
        'A single-party communist state, where the Communist Party controls government with no multi-party national elections',
        'The world\'s largest multiparty democracy',
        'An absolute monarchy',
        'A system identical to India\'s'
      ],
      answer: 0,
      explanation: 'China is a single-party communist state, with the Communist Party controlling government and no multi-party national elections.',
      choiceFeedback: [null, 'This describes India, China\'s neighbor, not China itself.', 'China has no hereditary monarch.', 'China and India have fundamentally different government structures, despite being neighbors.'],
      xp: 10
    },
    {
      id: 'q12',
      type: 'choice',
      prompt: 'What does the comparison of Israel, Saudi Arabia, Turkey, China, and India together demonstrate?',
      choices: [
        'Government type is not determined by region — genuinely different systems can exist within the same broad region',
        'Every country in the same region always has an identical government type',
        'Government type is determined entirely by geography',
        'This comparison teaches nothing useful about government'
      ],
      answer: 0,
      explanation: 'These five countries show that government type is not determined by region — genuinely different systems can exist within the same broad region.',
      choiceFeedback: [null, 'This is directly contradicted by these five real examples.', 'Geography has no documented, direct causal relationship to government type.', 'This comparison directly illustrates a core, testable idea in Georgia\'s civics standards.'],
      xp: 10
    },
    {
      id: 'q13',
      type: 'choice',
      prompt: 'What is a mixed economy?',
      choices: [
        'An economy located on a continuum between pure market and pure command, combining private market activity with government direction',
        'An economy identical to a pure market economy with zero government involvement',
        'An economy identical to a pure command economy with zero private activity',
        'A type of economy that does not actually exist in the real world'
      ],
      answer: 0,
      explanation: 'A mixed economy sits somewhere on a continuum between pure market and pure command, combining private market activity with government direction.',
      choiceFeedback: [null, 'A mixed economy specifically combines market activity with government involvement.', 'A mixed economy combines government direction with real private market activity.', 'Most real-world countries, including South Africa, Nigeria, China, and India, are genuinely mixed economies.'],
      xp: 10
    },
    {
      id: 'q14',
      type: 'choice',
      prompt: "How are South Africa's, Nigeria's, and Kenya's real economic systems best described?",
      choices: [
        'All three are mixed economies, with South Africa generally the most market-oriented of the three',
        'All three are pure command economies',
        'All three are pure traditional economies with no modern industry',
        'These countries have no real describable economic system'
      ],
      answer: 0,
      explanation: 'South Africa, Nigeria, and Kenya are all real mixed economies, with South Africa generally the most market-oriented.',
      choiceFeedback: [null, 'These are mixed economies, not pure command systems.', 'These countries have real modern industry alongside government involvement.', 'All three have well-documented, real mixed economic systems.'],
      xp: 10
    },
    {
      id: 'q15',
      type: 'choice',
      prompt: 'How does voluntary trade benefit buyers and sellers?',
      choices: [
        'Both sides expect to be better off after the trade than before it',
        'Only the seller benefits from voluntary trade',
        'Only the buyer benefits from voluntary trade',
        'Neither side actually benefits from voluntary trade'
      ],
      answer: 0,
      explanation: 'Both the buyer and seller expect to be better off after a voluntary trade — that mutual benefit is why the trade happens.',
      choiceFeedback: [null, 'Voluntary trade benefits both sides, not just the seller.', 'Voluntary trade benefits both sides, not just the buyer.', 'Voluntary trade is defined by mutual benefit for both parties.'],
      xp: 10
    },
    {
      id: 'q16',
      type: 'choice',
      prompt: 'What is the difference between a tariff and a quota?',
      choices: [
        'A tariff is a tax on imports; a quota is a limit on the quantity of a good that can be imported',
        'A tariff and a quota are the exact same thing',
        'A tariff is a quantity limit, and a quota is a tax',
        'Neither a tariff nor a quota is a real trade barrier'
      ],
      answer: 0,
      explanation: 'A tariff is a tax on imports, while a quota is a limit on the quantity of a good that can be imported.',
      choiceFeedback: [null, 'These are two genuinely different types of trade barriers.', 'This reverses the real definitions.', 'Both are real, well-documented trade barriers used by real governments.'],
      xp: 10
    },
    {
      id: 'q17',
      type: 'choice',
      prompt: "What is OPEC's real primary function?",
      choices: [
        'To coordinate and unify petroleum policy among member countries and help stabilize oil markets',
        'To ban all oil trade worldwide',
        'To set prices for goods completely unrelated to oil',
        'OPEC has no real function or influence'
      ],
      answer: 0,
      explanation: "OPEC's real primary function is to coordinate petroleum policy among member countries and help stabilize oil markets.",
      choiceFeedback: [null, "OPEC's real function is to coordinate oil policy, not ban oil trade.", "OPEC's function is specifically about petroleum, not unrelated goods.", 'OPEC has a real, well-documented, significant influence on global oil markets.'],
      xp: 10
    },
    {
      id: 'q18',
      type: 'choice',
      prompt: 'What is human capital, and how does investing in it affect GDP per capita?',
      choices: [
        "A population's education, training, and skills; investing in it tends to raise GDP per capita over time",
        "A country's physical currency and coins",
        'A type of natural resource, like oil or minerals',
        'Investing in human capital always LOWERS GDP per capita'
      ],
      answer: 0,
      explanation: "Human capital is a population's education, training, and skills; investing in it tends to raise GDP per capita by making workers more productive.",
      choiceFeedback: [null, 'This describes money, not human capital.', 'This describes a natural resource, not human capital.', 'This reverses the real relationship — investment in human capital tends to raise GDP per capita.'],
      xp: 10
    },
    {
      id: 'q19',
      type: 'choice',
      prompt: "How can the distribution of natural resources affect a region's development, using real examples?",
      choices: [
        'Uneven distribution — like oil in parts of the Middle East or minerals in parts of Africa — can drive dramatically different wealth levels between neighboring countries',
        'Natural resources are distributed perfectly evenly across every country',
        'Natural resources have no real effect on economic development',
        'Every country with natural resources automatically becomes equally wealthy'
      ],
      answer: 0,
      explanation: 'Uneven natural resource distribution can drive dramatically different wealth levels between neighboring countries.',
      choiceFeedback: [null, 'Real natural resource distribution is genuinely uneven.', 'Natural resource distribution has a real, major, documented effect on development.', 'Resource wealth alone does not guarantee equal development.'],
      xp: 10
    },
    {
      id: 'q20',
      type: 'choice',
      prompt: 'What role does entrepreneurship play in economic growth?',
      choices: [
        'Entrepreneurs start new businesses, taking on risk to create new products, jobs, and innovations',
        'Entrepreneurship has no real connection to economic growth',
        'Entrepreneurs avoid all risk by definition',
        'Only government workers can be entrepreneurs'
      ],
      answer: 0,
      explanation: 'Entrepreneurship drives economic growth because entrepreneurs take on real risk to start businesses, creating jobs and innovation.',
      choiceFeedback: [null, 'Entrepreneurship has a real, direct connection to job creation and innovation.', 'Taking on real risk is a defining feature of entrepreneurship.', 'Entrepreneurship is specifically about individuals starting private businesses.'],
      xp: 10
    },
    {
      id: 'q21',
      type: 'choice',
      prompt: 'What is the basic principle of effective personal money management?',
      choices: [
        "Live within your income — don't spend more than you earn",
        'Always spend more than you earn, using credit to cover the difference',
        'Save 100% of your income and spend nothing at all',
        'Personal money management has no real guiding principle'
      ],
      answer: 0,
      explanation: 'The basic principle of effective personal money management is to live within your income.',
      choiceFeedback: [null, 'This is the opposite of the real principle.', 'The real principle is about balancing spending and saving, not spending literally nothing.', 'There is a real, specific, standard-tested guiding principle here.'],
      xp: 10
    },
    {
      id: 'q22',
      type: 'choice',
      prompt: 'What is a budget, and what is its purpose?',
      choices: [
        "A tool to plan the spending and saving of income, helping ensure spending doesn't exceed what's coming in",
        'A record of money already spent, with no planning function',
        'A type of loan offered by a bank',
        'A budget has no real connection to saving money'
      ],
      answer: 0,
      explanation: "A budget is a tool to plan the spending and saving of income, helping ensure spending doesn't exceed what's coming in.",
      choiceFeedback: [null, 'A budget is specifically a planning tool, not just a record after the fact.', 'This describes a loan, not a budget.', 'A budget specifically plans both spending and saving.'],
      xp: 10
    },
    {
      id: 'q23',
      type: 'choice',
      prompt: 'True or False: Using credit typically costs more than paying with money you already have, because of added interest.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — using credit typically comes with interest, making it cost more than paying with money you already have.',
      choiceFeedback: [null, 'This is a real, well-documented fact about how credit works — the statement as written is True.'],
      xp: 10
    },
    {
      id: 'q24',
      type: 'choice',
      prompt: 'What single idea connects this quarter\'s Geography, Government, and Economics lessons across Africa, Southwest Asia, and Southern & Eastern Asia?',
      choices: [
        'Real conditions vary widely within and across these regions — physical geography, government type, and economic system all differ from country to country, not just region to region',
        'Every country in these regions is identical in geography, government, and economics',
        'These three topics (geography, government, economics) have no real connection to each other',
        'Region alone determines a country\'s geography, government, and economy'
      ],
      answer: 0,
      explanation: 'This quarter\'s central idea is that real conditions — physical geography, government type, and economic system — vary widely from country to country, not just region to region.',
      choiceFeedback: [null, 'This is directly contradicted by every real example covered this quarter.', 'These topics are directly connected — geography shapes trade and settlement, which shapes government and economic development.', 'This is directly contradicted by every real example covered this quarter, from Israel/Saudi Arabia/Turkey to China/India.'],
      xp: 10
    }
  ]
};
