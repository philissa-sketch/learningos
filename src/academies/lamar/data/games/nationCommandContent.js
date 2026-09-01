// ---------------------------------------------------------------------------
// Nation Command: Build Your World — real content source.
//
// Every government type, economic system, trade tool, and budget category
// below is pulled directly from the real Q2 Social Studies lessons
// (`ss7-government-political-systems`, `ss7-sharia-law-comparative-
// government`, `ss7-economic-systems-trade`, `ss7-economic-growth-money-
// management` in `socialStudies7.js`) — same standard as every other piece
// of content in this app: real definitions, not invented game rules. The
// point totals are a game abstraction on TOP of real facts, not a
// substitute for them — every `flavor`/`resultText` line explains the real
// mechanism behind the score change.
// ---------------------------------------------------------------------------

export const GOVERNMENT_TYPES = [
  {
    id: 'parliamentary-democracy',
    name: 'Parliamentary Democracy',
    basedOn: 'Israel',
    description:
      "Citizens vote for political parties for a national parliament (like Israel's 120-member Knesset); the party or coalition that can command enough seats then selects the head of government.",
    points: { citizenVoice: 3, decisionSpeed: 1 },
    flavor:
      'Real citizen voice — every vote for a party genuinely shapes who leads. The tradeoff: when no single party wins a majority, multiple parties have to negotiate a coalition, which takes real time.'
  },
  {
    id: 'autocratic-monarchy',
    name: 'Autocratic Monarchy',
    basedOn: 'Saudi Arabia',
    description:
      'One ruler holds power inherited within a single family, as both head of state and head of government — with no direct citizen vote for that position at all.',
    points: { citizenVoice: 0, decisionSpeed: 3 },
    flavor:
      'One ruler can decide fast, with no coalition to negotiate. The real tradeoff: citizens have zero direct vote for who leads them.'
  },
  {
    id: 'presidential-system',
    name: 'Presidential System',
    basedOn: 'Turkey (since its real 2018 constitutional shift)',
    description:
      'Citizens directly elect a president who serves as both head of state and head of government — Turkey adopted this system in 2018, abolishing the office of prime minister.',
    points: { citizenVoice: 2, decisionSpeed: 2 },
    flavor:
      'A real, direct vote for a single named leader — genuine citizen voice, without a multi-party coalition slowing decisions down as much as a parliamentary system.'
  }
];

export const ECONOMIC_SYSTEMS = [
  {
    id: 'traditional',
    name: 'Traditional Economy',
    description:
      'Decisions about what, how, and for whom to produce are guided by custom and habit passed down through generations — often centered on subsistence farming or herding.',
    points: { production: 1, happiness: 3 },
    flavor: 'Stable and predictable, matching real custom — but real output stays limited.'
  },
  {
    id: 'command',
    name: 'Command Economy',
    description:
      'A central government makes the decisions about what, how, and for whom to produce — the real system North Korea sits firmly under, per Q2\'s market-to-command continuum.',
    points: { production: 2, happiness: 1 },
    flavor: 'Centrally coordinated output — but individuals have little say in what actually gets made.'
  },
  {
    id: 'market',
    name: 'Market Economy',
    description:
      'Individual buyers and sellers, through real supply and demand, decide what, how, and for whom to produce — the system Japan sits closest to on that same continuum.',
    points: { production: 3, happiness: 2 },
    flavor: 'The highest real output of the four — driven by individual choice, with real inequality risk alongside it.'
  },
  {
    id: 'mixed',
    name: 'Mixed Economy',
    description:
      'Combines private market activity with real government direction — where almost every actual country (South Africa, Nigeria, Kenya, China) genuinely sits, per Q2\'s continuum.',
    points: { production: 2, happiness: 2 },
    flavor: 'Balanced on purpose — the same real point on the continuum most real countries in this unit actually occupy.'
  }
];

export const TRADE_EVENT = {
  scenario:
    'A neighboring country starts selling steel far cheaper than your own mills can produce it. Your domestic steelworkers are asking for protection. What do you do?',
  options: [
    {
      id: 'tariff',
      name: 'Impose a Tariff',
      description: 'A real tax placed on the imported steel, making it more expensive.',
      points: { wealth: 1, happiness: 1 },
      resultText:
        'Real effect of a tariff: your treasury collects genuine tax revenue and domestic mills get real relief from cheap competition, but the tax raises prices for anyone who buys anything built with that steel.'
    },
    {
      id: 'quota',
      name: 'Set a Quota',
      description: 'A real limit on the quantity of imported steel allowed in.',
      points: { wealth: 1, happiness: 0 },
      resultText:
        'Real effect of a quota: it caps the quantity directly instead of taxing it — domestic mills get a guaranteed share of the market, but the limited supply can still push prices up for buyers.'
    },
    {
      id: 'free-trade',
      name: 'Allow Free Trade',
      description: 'No barrier — real voluntary trade continues, since both sides expect to benefit.',
      points: { wealth: 3, happiness: -1 },
      resultText:
        'Real effect of voluntary trade: both sides genuinely benefit and your economy grows from cheaper steel, but your own steelworkers face real, tough competition they can\'t easily out-price.'
    },
    {
      id: 'embargo',
      name: 'Declare an Embargo',
      description: 'A government order that stops trade with that country, often for political reasons.',
      points: { wealth: -1, happiness: 1 },
      resultText:
        'Real effect of an embargo: your steelworkers are fully protected and it sends a real political message, but you lose ALL trade with that country — including anything else you needed from them.'
    }
  ]
};

// Personal-budget parallel from Economics II (SS7E10) — real budget
// categories mapped onto a national scale, same "your own limited income"
// logic the lesson explicitly draws between a country and an individual.
export const BUDGET_CATEGORIES = [
  {
    id: 'spend',
    name: 'Spend on Services',
    description: 'Real spending on public services now — raises citizen happiness immediately.',
    scoreField: 'happiness'
  },
  {
    id: 'save',
    name: 'Save',
    description:
      'A real cushion for emergencies and future needs — the same benefit Economics II describes for personal saving, just at national scale.',
    scoreField: 'wealth'
  },
  {
    id: 'humanCapitalInvestment',
    name: 'Invest in Human Capital',
    description: "A population's real education, training, and skills — raises production over time, the same way it raises GDP per capita in real countries.",
    scoreField: 'production'
  },
  {
    id: 'capitalGoodsInvestment',
    name: 'Invest in Capital Goods',
    description: 'Real factories, machinery, and technology used to produce other goods — raises what your nation can actually produce.',
    scoreField: 'production'
  }
];

export const BUDGET_TOTAL_POINTS = 100;

// Renamed from SCORE_LABELS: this Academy's two games each had one, and a slot
// cannot hold the same name twice. The importing component aliases it straight
// back to SCORE_LABELS, so nothing inside that component changed.
export const NATION_SCORE_LABELS = {
  citizenVoice: 'Citizen Voice',
  decisionSpeed: 'Decision Speed',
  production: 'Production',
  happiness: 'Happiness',
  wealth: 'Wealth'
};
