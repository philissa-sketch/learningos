/**
 * WORD STUDY — 320 spelling words and 320 vocabulary words, ten of each a week
 * for the thirty-two weeks of her year.
 *
 * ---- SPELLING: A 3RD-GRADE SCHOOL LIST (Sept 24 2026) ----
 *
 * Gigi: "The words should be the correct spelling words that she would learn in
 * school." Asked which grade: "3rd grade all year." So the spelling list is no
 * longer pulled from her lessons (the first version did that, and gave her
 * words like "forces", "called" and "ones", which are not what a school teaches
 * in a spelling week).
 *
 * Each week is ONE spelling pattern, in the order a 3rd-grade class meets them:
 * short vowels, then long vowels, digraphs, r-controlled vowels, vowel teams,
 * soft c and g, silent letters, compound words, plurals, adding -ed and -ing,
 * prefixes, suffixes, then the harder endings and the tricky words learned by
 * heart. The pattern is on each week as `pattern`.
 *
 * LEFT OUT ON PURPOSE:
 *   · Homophones (there / their / they're). Her spelling test SAYS each word
 *     and nothing else, so she could not know which one is meant. A week of
 *     them would mark her wrong for hearing correctly.
 *   · Contractions (can't, don't). The word search and the missing-letter
 *     activity work on letters only; the apostrophe would be lost.
 *
 * Every word is spelled the American way, and none is also one of her
 * vocabulary words, so the two lists never teach one word twice.
 *
 * ---- VOCABULARY: STILL FROM HER LESSONS ----
 *
 * VOCABULARY comes from each lesson's own `words:` array — the terms the
 * lesson was written to teach — so she learns the words of the week she is
 * reading. Gigi: "Keep, American spelling." Five used British spelling and are
 * now American: water vapor, mold, defense chemical, standardized, tumor. (The
 * lessons themselves still use British spelling in places; that is a separate
 * job, not done here.)
 *
 * ⚠️ THIRTY-TWO WEEKS, NOT THIRTY-SIX: her year is four quarters of eight.
 *
 * ⚠️ STORED, NOT RECOMPUTED, so a list never changes under her mid-year.
 * Carry-over (lib/wordWeek.js): the list moves on every Monday; missed words
 * carry into next week first and are topped up to ten; a test never taken
 * carries the whole list forward. Her past test results are never changed by
 * this file: they keep the words she was actually tested on.
 */

export const WORD_STUDY_WEEKS = [
  {
    quarter: 1,
    n: 1,
    pattern: 'Short a and short i',
    spelling: [
      { word: 'black' },
      { word: 'plant' },
      { word: 'glass' },
      { word: 'stamp' },
      { word: 'crab' },
      { word: 'split' },
      { word: 'twist' },
      { word: 'drink' },
      { word: 'fifth' },
      { word: 'sniff' }
    ],
    vocabulary: [
      { word: 'seed coat', from: 'hb-m1-01' },
      { word: 'embryo', from: 'hb-m1-01' },
      { word: 'endosperm', from: 'hb-m1-01' },
      { word: 'dormant', from: 'hb-m1-01' },
      { word: 'germination', from: 'hb-m1-01' },
      { word: 'life cycle', from: 'hb-m1-02' },
      { word: 'seedling', from: 'hb-m1-02' },
      { word: 'adult plant', from: 'hb-m1-02' },
      { word: 'pollination', from: 'hb-m1-02' },
      { word: 'fruit', from: 'hb-m1-02' }
    ]
  },
  {
    quarter: 1,
    n: 2,
    pattern: 'Short o, short u, short e',
    spelling: [
      { word: 'clock' },
      { word: 'pond' },
      { word: 'shelf' },
      { word: 'dress' },
      { word: 'crust' },
      { word: 'plump' },
      { word: 'trunk' },
      { word: 'blend' },
      { word: 'spell' },
      { word: 'stuck' }
    ],
    vocabulary: [
      { word: 'annual', from: 'hb-m1-04' },
      { word: 'perennial', from: 'hb-m1-04' },
      { word: 'bulb', from: 'hb-m1-04' },
      { word: 'rhizome', from: 'hb-m1-04' },
      { word: 'die back', from: 'hb-m1-04' },
      { word: 'nutrients', from: 'hb-m1-05' },
      { word: 'hydroponics', from: 'hb-m1-05' },
      { word: 'sunlight', from: 'hb-m1-05' },
      { word: 'air', from: 'hb-m1-05' },
      { word: 'support', from: 'hb-m1-05' }
    ]
  },
  {
    quarter: 1,
    n: 3,
    pattern: 'Long a: a_e, ai, ay',
    spelling: [
      { word: 'brain' },
      { word: 'trail' },
      { word: 'paint' },
      { word: 'gray' },
      { word: 'stay' },
      { word: 'spray' },
      { word: 'shape' },
      { word: 'flame' },
      { word: 'plane' },
      { word: 'chain' }
    ],
    vocabulary: [
      { word: 'root', from: 'hb-1-01' },
      { word: 'stem', from: 'hb-1-01' },
      { word: 'leaf', from: 'hb-1-01' },
      { word: 'flower', from: 'hb-1-01' },
      { word: 'soil', from: 'hb-1-02' },
      { word: 'water', from: 'hb-1-02' },
      { word: 'taproot', from: 'hb-m2-03' },
      { word: 'fibrous roots', from: 'hb-m2-03' },
      { word: 'root hairs', from: 'hb-m2-03' },
      { word: 'anchor', from: 'hb-m2-03' }
    ]
  },
  {
    quarter: 1,
    n: 4,
    pattern: 'Long e: ee, ea, e_e',
    spelling: [
      { word: 'sweet' },
      { word: 'green' },
      { word: 'sleep' },
      { word: 'beach' },
      { word: 'clean' },
      { word: 'dream' },
      { word: 'cheese' },
      { word: 'these' },
      { word: 'peach' },
      { word: 'speak' }
    ],
    vocabulary: [
      { word: 'stalk', from: 'hb-1-03' },
      { word: 'light', from: 'hb-1-04' },
      { word: 'vein', from: 'hb-1-04' },
      { word: 'humus', from: 'hb-m2-06' },
      { word: 'minerals', from: 'hb-m2-06' },
      { word: 'decomposer', from: 'hb-m2-06' },
      { word: 'topsoil', from: 'hb-m2-06' },
      { word: 'terrain', from: 'ss-m2-03' },
      { word: 'cover', from: 'ss-m2-03' },
      { word: 'ridge', from: 'ss-m2-03' }
    ]
  },
  {
    quarter: 1,
    n: 5,
    pattern: 'Long i: i_e, igh, y',
    spelling: [
      { word: 'bright' },
      { word: 'night' },
      { word: 'fight' },
      { word: 'slide' },
      { word: 'smile' },
      { word: 'prize' },
      { word: 'sky' },
      { word: 'fly' },
      { word: 'shy' },
      { word: 'tight' }
    ],
    vocabulary: [
      { word: 'producer', from: 'hb-m3-01' },
      { word: 'consumer', from: 'hb-m3-01' },
      { word: 'ecosystem', from: 'hb-m3-01' },
      { word: 'compost', from: 'hb-m3-02' },
      { word: 'decompose', from: 'hb-m3-02' },
      { word: 'bacteria', from: 'hb-m3-02' },
      { word: 'fungi', from: 'hb-m3-02' },
      { word: 'energy', from: 'hb-m3-03' },
      { word: 'food chain', from: 'hb-m3-03' },
      { word: 'compromise', from: 'ss-m3-01' }
    ]
  },
  {
    quarter: 1,
    n: 6,
    pattern: 'Long o: o_e, oa, ow',
    spelling: [
      { word: 'stone' },
      { word: 'those' },
      { word: 'float' },
      { word: 'coast' },
      { word: 'toast' },
      { word: 'throw' },
      { word: 'grown' },
      { word: 'snow' },
      { word: 'globe' },
      { word: 'soap' }
    ],
    vocabulary: [
      { word: 'food web', from: 'hb-m3-04' },
      { word: 'arrow', from: 'hb-m3-04' },
      { word: 'predict', from: 'hb-m3-05' },
      { word: 'balance', from: 'hb-m3-05' },
      { word: 'pollinator', from: 'hb-m3-06' },
      { word: 'pollen', from: 'hb-m3-06' },
      { word: 'scarce', from: 'hb-m3-06' },
      { word: 'extinct', from: 'hb-m3-06' },
      { word: 'over-abundant', from: 'hb-m3-06' },
      { word: 'preamble', from: 'ss-m3-03' }
    ]
  },
  {
    quarter: 1,
    n: 7,
    pattern: 'Long u and oo: u_e, ue, ew, oo',
    spelling: [
      { word: 'flute' },
      { word: 'cube' },
      { word: 'huge' },
      { word: 'glue' },
      { word: 'true' },
      { word: 'blue' },
      { word: 'flew' },
      { word: 'chew' },
      { word: 'spoon' },
      { word: 'tooth' }
    ],
    vocabulary: [
      { word: 'oval', from: 'hb-1-05' },
      { word: 'narrow', from: 'hb-1-05' },
      { word: 'toothed', from: 'hb-1-06' },
      { word: 'lobed', from: 'hb-1-06' },
      { word: 'alternate', from: 'hb-1-07' },
      { word: 'pair', from: 'hb-1-07' },
      { word: 'federal', from: 'ss-m4-01' },
      { word: 'state', from: 'ss-m4-01' },
      { word: 'shared', from: 'ss-m4-01' },
      { word: 'branch', from: 'ss-m4-02' }
    ]
  },
  {
    quarter: 1,
    n: 8,
    pattern: 'Digraphs: sh, ch, th, wh, tch',
    spelling: [
      { word: 'shell' },
      { word: 'chest' },
      { word: 'think' },
      { word: 'whale' },
      { word: 'catch' },
      { word: 'match' },
      { word: 'watch' },
      { word: 'bench' },
      { word: 'thumb' },
      { word: 'which' }
    ],
    vocabulary: [
      { word: 'adaptation', from: 'hb-m4-04' },
      { word: 'thorn', from: 'hb-m4-04' },
      { word: 'spine', from: 'hb-m4-04' },
      { word: 'trichome', from: 'hb-m4-04' },
      { word: 'latex', from: 'hb-m4-04' },
      { word: 'aromatic', from: 'hb-m4-05' },
      { word: 'chemical', from: 'hb-m4-05' },
      { word: 'volatile', from: 'hb-m4-05' },
      { word: 'repel', from: 'hb-m4-05' },
      { word: 'attract', from: 'hb-m4-05' }
    ]
  },
  {
    quarter: 2,
    n: 1,
    pattern: 'R-controlled ar and or',
    spelling: [
      { word: 'sharp' },
      { word: 'march' },
      { word: 'start' },
      { word: 'yard' },
      { word: 'smart' },
      { word: 'storm' },
      { word: 'horse' },
      { word: 'north' },
      { word: 'sport' },
      { word: 'porch' }
    ],
    vocabulary: [
      { word: 'evaporation', from: 'hb-m5-01' },
      { word: 'water vapor', from: 'hb-m5-01' },
      { word: 'condensation', from: 'hb-m5-01' },
      { word: 'precipitation', from: 'hb-m5-01' },
      { word: 'water cycle', from: 'hb-m5-01' },
      { word: 'solid', from: 'hb-m5-02' },
      { word: 'liquid', from: 'hb-m5-02' },
      { word: 'gas', from: 'hb-m5-02' },
      { word: 'melting', from: 'hb-m5-02' },
      { word: 'freezing', from: 'hb-m5-02' }
    ]
  },
  {
    quarter: 2,
    n: 2,
    pattern: 'R-controlled er, ir, ur',
    spelling: [
      { word: 'fern' },
      { word: 'herd' },
      { word: 'perch' },
      { word: 'shirt' },
      { word: 'third' },
      { word: 'birth' },
      { word: 'curl' },
      { word: 'burn' },
      { word: 'church' },
      { word: 'nurse' }
    ],
    vocabulary: [
      { word: 'xylem', from: 'hb-m5-04' },
      { word: 'transpiration pull', from: 'hb-m5-04' },
      { word: 'capillary action', from: 'hb-m5-04' },
      { word: 'drainage', from: 'hb-m5-05' },
      { word: 'air pockets', from: 'hb-m5-05' },
      { word: 'sand', from: 'hb-m5-05' },
      { word: 'clay', from: 'hb-m5-05' },
      { word: 'loam', from: 'hb-m5-05' },
      { word: 'wilting', from: 'hb-m5-06' },
      { word: 'crispy', from: 'hb-m5-06' }
    ]
  },
  {
    quarter: 2,
    n: 3,
    pattern: 'ou and ow',
    spelling: [
      { word: 'cloud' },
      { word: 'sound' },
      { word: 'mouth' },
      { word: 'found' },
      { word: 'proud' },
      { word: 'crown' },
      { word: 'frown' },
      { word: 'growl' },
      { word: 'tower' },
      { word: 'shower' }
    ],
    vocabulary: [
      { word: 'petal', from: 'hb-1-08' },
      { word: 'bee', from: 'hb-1-08' },
      { word: 'sepal', from: 'hb-m6-02' },
      { word: 'stamen', from: 'hb-m6-02' },
      { word: 'anther', from: 'hb-m6-02' },
      { word: 'pistil', from: 'hb-m6-02' },
      { word: 'stigma', from: 'hb-m6-02' },
      { word: 'ovary', from: 'hb-m6-02' },
      { word: 'nectar', from: 'hb-m6-03' },
      { word: 'wind-pollinated', from: 'hb-m6-03' }
    ]
  },
  {
    quarter: 2,
    n: 4,
    pattern: 'oi and oy',
    spelling: [
      { word: 'point' },
      { word: 'voice' },
      { word: 'noise' },
      { word: 'spoil' },
      { word: 'join' },
      { word: 'coin' },
      { word: 'boy' },
      { word: 'toy' },
      { word: 'enjoy' },
      { word: 'royal' }
    ],
    vocabulary: [
      { word: 'habitat', from: 'hb-m6-04' },
      { word: 'native bee', from: 'hb-m6-04' },
      { word: 'bare ground', from: 'hb-m6-04' },
      { word: 'shallow', from: 'hb-m6-04' },
      { word: 'bloom', from: 'hb-m6-04' },
      { word: 'disperse', from: 'hb-m6-05' },
      { word: 'kernel', from: 'hb-m6-05' },
      { word: 'pod', from: 'hb-m6-05' },
      { word: 'fungus', from: 'hb-m6-06' },
      { word: 'mycelium', from: 'hb-m6-06' }
    ]
  },
  {
    quarter: 2,
    n: 5,
    pattern: 'aw, au, al',
    spelling: [
      { word: 'straw' },
      { word: 'crawl' },
      { word: 'dawn' },
      { word: 'hawk' },
      { word: 'lawn' },
      { word: 'launch' },
      { word: 'pause' },
      { word: 'sauce' },
      { word: 'chalk' },
      { word: 'talk' }
    ],
    vocabulary: [
      { word: 'forage', from: 'hb-m7-01' },
      { word: 'cultivate', from: 'hb-m7-01' },
      { word: 'wild plant', from: 'hb-m7-01' },
      { word: 'tradition', from: 'hb-m7-01' },
      { word: 'spice', from: 'hb-m7-02' },
      { word: 'herb', from: 'hb-m7-02' },
      { word: 'bark', from: 'hb-m7-02' },
      { word: 'preserve', from: 'hb-m7-03' },
      { word: 'moisture', from: 'hb-m7-03' },
      { word: 'mold', from: 'hb-m7-03' }
    ]
  },
  {
    quarter: 2,
    n: 6,
    pattern: 'Soft c and soft g',
    spelling: [
      { word: 'face' },
      { word: 'rice' },
      { word: 'city' },
      { word: 'circus' },
      { word: 'space' },
      { word: 'page' },
      { word: 'cage' },
      { word: 'gym' },
      { word: 'giant' },
      { word: 'bridge' }
    ],
    vocabulary: [
      { word: 'midwife', from: 'hb-m7-04' },
      { word: 'granny midwife', from: 'hb-m7-04' },
      { word: 'oral tradition', from: 'hb-m7-04' },
      { word: 'root doctor', from: 'hb-m7-04' },
      { word: 'record', from: 'hb-m7-04' },
      { word: 'okra', from: 'hb-m7-05' },
      { word: 'sorghum', from: 'hb-m7-05' },
      { word: 'cowpea', from: 'hb-m7-05' },
      { word: 'staple crop', from: 'hb-m7-05' },
      { word: 'herbarium', from: 'hb-m7-06' }
    ]
  },
  {
    quarter: 2,
    n: 7,
    pattern: 'Silent letters: kn, wr, gn, mb',
    spelling: [
      { word: 'knee' },
      { word: 'knock' },
      { word: 'knife' },
      { word: 'know' },
      { word: 'wreck' },
      { word: 'wrong' },
      { word: 'wrap' },
      { word: 'gnat' },
      { word: 'lamb' },
      { word: 'climb' }
    ],
    vocabulary: [
      { word: 'family', from: 'hb-1-10' },
      { word: 'group', from: 'hb-1-10' },
      { word: 'related', from: 'hb-1-10' },
      { word: 'key', from: 'hb-1-11' },
      { word: 'clue', from: 'hb-1-11' },
      { word: 'step', from: 'hb-1-11' },
      { word: 'date', from: 'hb-1-13' },
      { word: 'price', from: 'ss-m8-01' },
      { word: 'incentive', from: 'ss-m8-01' },
      { word: 'demand', from: 'ss-m8-01' }
    ]
  },
  {
    quarter: 2,
    n: 8,
    pattern: 'Compound words',
    spelling: [
      { word: 'sunset' },
      { word: 'raincoat' },
      { word: 'bedroom' },
      { word: 'backyard' },
      { word: 'sunflower' },
      { word: 'cupcake' },
      { word: 'homework' },
      { word: 'notebook' },
      { word: 'sidewalk' },
      { word: 'anything' }
    ],
    vocabulary: [
      { word: 'extraction', from: 'hb-m8-04' },
      { word: 'infusion', from: 'hb-m8-04' },
      { word: 'solar', from: 'hb-m8-04' },
      { word: 'strain', from: 'hb-m8-04' },
      { word: 'observation', from: 'hb-m8-04' },
      { word: 'data', from: 'hb-m8-05' },
      { word: 'pattern', from: 'hb-m8-05' },
      { word: 'interval', from: 'hb-m8-05' },
      { word: 'bar graph', from: 'hb-m8-05' },
      { word: 'claim', from: 'hb-m8-06' }
    ]
  },
  {
    quarter: 3,
    n: 1,
    pattern: 'Plurals with -s and -es',
    spelling: [
      { word: 'foxes' },
      { word: 'dishes' },
      { word: 'lunches' },
      { word: 'glasses' },
      { word: 'buses' },
      { word: 'boxes' },
      { word: 'wishes' },
      { word: 'benches' },
      { word: 'classes' },
      { word: 'peaches' }
    ],
    vocabulary: [
      { word: 'weather', from: 'hb-m9-01' },
      { word: 'atmosphere', from: 'hb-m9-01' },
      { word: 'temperature', from: 'hb-m9-01' },
      { word: 'humidity', from: 'hb-m9-01' },
      { word: 'meteorologist', from: 'hb-m9-01' },
      { word: 'instrument', from: 'hb-m9-02' },
      { word: 'thermometer', from: 'hb-m9-02' },
      { word: 'rain gauge', from: 'hb-m9-02' },
      { word: 'wind vane', from: 'hb-m9-02' },
      { word: 'degrees', from: 'hb-m9-02' }
    ]
  },
  {
    quarter: 3,
    n: 2,
    pattern: 'Plurals: y to ies, f to ves',
    spelling: [
      { word: 'berries' },
      { word: 'babies' },
      { word: 'cities' },
      { word: 'puppies' },
      { word: 'stories' },
      { word: 'leaves' },
      { word: 'wolves' },
      { word: 'halves' },
      { word: 'knives' },
      { word: 'shelves' }
    ],
    vocabulary: [
      { word: 'cirrus', from: 'hb-m9-04' },
      { word: 'stratus', from: 'hb-m9-04' },
      { word: 'cumulus', from: 'hb-m9-04' },
      { word: 'sky cover', from: 'hb-m9-04' },
      { word: 'cumulonimbus', from: 'hb-m9-05' },
      { word: 'graph', from: 'hb-m9-06' },
      { word: 'axis', from: 'hb-m9-06' },
      { word: 'average', from: 'hb-m9-06' },
      { word: 'suffrage', from: 'ss-m9-03' },
      { word: 'petition', from: 'ss-m9-03' }
    ]
  },
  {
    quarter: 3,
    n: 3,
    pattern: '-ed and -ing: double the last letter',
    spelling: [
      { word: 'stopped' },
      { word: 'planned' },
      { word: 'hopped' },
      { word: 'running' },
      { word: 'sitting' },
      { word: 'swimming' },
      { word: 'clapped' },
      { word: 'dropped' },
      { word: 'getting' },
      { word: 'shopping' }
    ],
    vocabulary: [
      { word: 'weather map', from: 'hb-m10-01' },
      { word: 'front', from: 'hb-m10-02' },
      { word: 'cold front', from: 'hb-m10-02' },
      { word: 'warm front', from: 'hb-m10-02' },
      { word: 'stationary front', from: 'hb-m10-02' },
      { word: 'air mass', from: 'hb-m10-02' },
      { word: 'overnight low', from: 'hb-m10-03' },
      { word: 'chance of rain', from: 'hb-m10-03' },
      { word: 'decision', from: 'hb-m10-03' },
      { word: 'secede', from: 'ss-m10-01' }
    ]
  },
  {
    quarter: 3,
    n: 4,
    pattern: '-ed and -ing: drop the e',
    spelling: [
      { word: 'baked' },
      { word: 'smiled' },
      { word: 'hoped' },
      { word: 'making' },
      { word: 'riding' },
      { word: 'taking' },
      { word: 'writing' },
      { word: 'skated' },
      { word: 'moving' },
      { word: 'traded' }
    ],
    vocabulary: [
      { word: 'climate', from: 'hb-m10-04' },
      { word: 'normal', from: 'hb-m10-04' },
      { word: 'growing season', from: 'hb-m10-05' },
      { word: 'hardiness zone', from: 'hb-m10-05' },
      { word: 'frost-free', from: 'hb-m10-05' },
      { word: 'tropical', from: 'hb-m10-05' },
      { word: 'frost', from: 'hb-m10-06' },
      { word: 'freeze', from: 'hb-m10-06' },
      { word: 'first frost', from: 'hb-m10-06' },
      { word: 'last frost', from: 'hb-m10-06' }
    ]
  },
  {
    quarter: 3,
    n: 5,
    pattern: 'Prefixes un- and re-',
    spelling: [
      { word: 'undo' },
      { word: 'unlock' },
      { word: 'unhappy' },
      { word: 'unsafe' },
      { word: 'unpack' },
      { word: 'redo' },
      { word: 'reread' },
      { word: 'rewrite' },
      { word: 'refill' },
      { word: 'retell' }
    ],
    vocabulary: [
      { word: 'mortar', from: 'hb-m11-01' },
      { word: 'pestle', from: 'hb-m11-01' },
      { word: 'sieve', from: 'hb-m11-01' },
      { word: 'surface area', from: 'hb-m11-01' },
      { word: 'apothecary', from: 'hb-m11-01' },
      { word: 'gram', from: 'hb-m11-02' },
      { word: 'tare', from: 'hb-m11-02' },
      { word: 'water content', from: 'hb-m11-03' },
      { word: 'airflow', from: 'hb-m11-03' },
      { word: 'brittle', from: 'hb-m11-03' }
    ]
  },
  {
    quarter: 3,
    n: 6,
    pattern: 'Prefixes dis-, pre-, mis-',
    spelling: [
      { word: 'dislike' },
      { word: 'disagree' },
      { word: 'disappear' },
      { word: 'preheat' },
      { word: 'preview' },
      { word: 'pretest' },
      { word: 'prepay' },
      { word: 'misspell' },
      { word: 'mistake' },
      { word: 'misplace' }
    ],
    vocabulary: [
      { word: 'decoction', from: 'hb-m11-04' },
      { word: 'maceration', from: 'hb-m11-04' },
      { word: 'solvent', from: 'hb-m11-04' },
      { word: 'shelf life', from: 'hb-m11-05' },
      { word: 'spoilage', from: 'hb-m11-05' },
      { word: 'best before', from: 'hb-m11-05' },
      { word: 'batch', from: 'hb-m11-06' },
      { word: 'method', from: 'hb-m11-06' },
      { word: 'repeatable', from: 'hb-m11-06' },
      { word: 'abolish', from: 'ss-m11-03' }
    ]
  },
  {
    quarter: 3,
    n: 7,
    pattern: 'Suffixes -ful and -less',
    spelling: [
      { word: 'careful' },
      { word: 'helpful' },
      { word: 'hopeful' },
      { word: 'thankful' },
      { word: 'colorful' },
      { word: 'painless' },
      { word: 'careless' },
      { word: 'spotless' },
      { word: 'useless' },
      { word: 'fearless' }
    ],
    vocabulary: [
      { word: 'sowing date', from: 'hb-m12-01' },
      { word: 'last frost date', from: 'hb-m12-01' },
      { word: 'days to maturity', from: 'hb-m12-01' },
      { word: 'counting back', from: 'hb-m12-01' },
      { word: 'planting plan', from: 'hb-m12-01' },
      { word: 'seed mix', from: 'hb-m12-02' },
      { word: 'leggy', from: 'hb-m12-02' },
      { word: 'sowing depth', from: 'hb-m12-02' },
      { word: 'hardening off', from: 'hb-m12-03' },
      { word: 'transplant', from: 'hb-m12-03' }
    ]
  },
  {
    quarter: 3,
    n: 8,
    pattern: 'Suffixes -ly, -ness, -er, -est',
    spelling: [
      { word: 'slowly' },
      { word: 'quickly' },
      { word: 'sadly' },
      { word: 'softly' },
      { word: 'kindness' },
      { word: 'darkness' },
      { word: 'sadness' },
      { word: 'faster' },
      { word: 'tallest' },
      { word: 'bigger' }
    ],
    vocabulary: [
      { word: 'succession planting', from: 'hb-m12-04' },
      { word: 'companion planting', from: 'hb-m12-04' },
      { word: 'Three Sisters', from: 'hb-m12-04' },
      { word: 'nitrogen', from: 'hb-m12-04' },
      { word: 'open pollinated', from: 'hb-m12-05' },
      { word: 'hybrid', from: 'hb-m12-05' },
      { word: 'comes true', from: 'hb-m12-05' },
      { word: 'winnowing', from: 'hb-m12-05' },
      { word: 'seed label', from: 'hb-m12-05' },
      { word: 'clearing', from: 'hb-m12-06' }
    ]
  },
  {
    quarter: 4,
    n: 1,
    pattern: 'Short e spelled ea',
    spelling: [
      { word: 'head' },
      { word: 'bread' },
      { word: 'ready' },
      { word: 'heavy' },
      { word: 'feather' },
      { word: 'health' },
      { word: 'breakfast' },
      { word: 'sweater' },
      { word: 'thread' },
      { word: 'instead' }
    ],
    vocabulary: [
      { word: 'compound', from: 'hb-m13-01' },
      { word: 'defense chemical', from: 'hb-m13-01' },
      { word: 'herbivore', from: 'hb-m13-01' },
      { word: 'bitter', from: 'hb-m13-01' },
      { word: 'allicin', from: 'hb-m13-01' },
      { word: 'salicin', from: 'hb-m13-02' },
      { word: 'isolate', from: 'hb-m13-02' },
      { word: 'active ingredient', from: 'hb-m13-02' },
      { word: 'standardized', from: 'hb-m13-02' },
      { word: 'mixture', from: 'hb-m13-03' }
    ]
  },
  {
    quarter: 4,
    n: 2,
    pattern: 'Three-letter blends: scr, spr, str, thr',
    spelling: [
      { word: 'scrub' },
      { word: 'screen' },
      { word: 'scream' },
      { word: 'strong' },
      { word: 'street' },
      { word: 'stripe' },
      { word: 'spring' },
      { word: 'sprout' },
      { word: 'throat' },
      { word: 'thrill' }
    ],
    vocabulary: [
      { word: 'excipient', from: 'hb-m13-04' },
      { word: 'filler', from: 'hb-m13-04' },
      { word: 'binder', from: 'hb-m13-04' },
      { word: 'disintegrant', from: 'hb-m13-04' },
      { word: 'batch number', from: 'hb-m13-04' },
      { word: 'dose', from: 'hb-m13-05' },
      { word: 'concentration', from: 'hb-m13-05' },
      { word: 'dilution', from: 'hb-m13-05' },
      { word: 'toxicology', from: 'hb-m13-05' },
      { word: 'pharmacist', from: 'hb-m13-05' }
    ]
  },
  {
    quarter: 4,
    n: 3,
    pattern: 'Endings -ge and -dge',
    spelling: [
      { word: 'badge' },
      { word: 'fudge' },
      { word: 'judge' },
      { word: 'edge' },
      { word: 'ledge' },
      { word: 'hedge' },
      { word: 'large' },
      { word: 'change' },
      { word: 'orange' },
      { word: 'charge' }
    ],
    vocabulary: [
      { word: 'anecdote', from: 'hb-m14-01' },
      { word: 'sample size', from: 'hb-m14-01' },
      { word: 'variation', from: 'hb-m14-01' },
      { word: 'variable', from: 'hb-m14-02' },
      { word: 'coincidence', from: 'hb-m14-02' },
      { word: 'cause', from: 'hb-m14-02' },
      { word: 'control group', from: 'hb-m14-03' },
      { word: 'treatment group', from: 'hb-m14-03' },
      { word: 'comparison', from: 'hb-m14-03' },
      { word: 'baseline', from: 'hb-m14-03' }
    ]
  },
  {
    quarter: 4,
    n: 4,
    pattern: 'Double consonants in the middle',
    spelling: [
      { word: 'rabbit' },
      { word: 'kitten' },
      { word: 'button' },
      { word: 'happen' },
      { word: 'letter' },
      { word: 'dinner' },
      { word: 'lesson' },
      { word: 'mitten' },
      { word: 'puppet' },
      { word: 'pillow' }
    ],
    vocabulary: [
      { word: 'placebo', from: 'hb-m14-04' },
      { word: 'blinded', from: 'hb-m14-04' },
      { word: 'double-blinded', from: 'hb-m14-04' },
      { word: 'expectation', from: 'hb-m14-04' },
      { word: 'bias', from: 'hb-m14-04' },
      { word: 'ingredient', from: 'hb-m14-05' },
      { word: 'net weight', from: 'hb-m14-05' },
      { word: 'cherry-picking', from: 'hb-m14-05' },
      { word: 'weasel word', from: 'hb-m14-05' },
      { word: 'revise', from: 'hb-m14-06' }
    ]
  },
  {
    quarter: 4,
    n: 5,
    pattern: 'Words ending in -le',
    spelling: [
      { word: 'little' },
      { word: 'table' },
      { word: 'candle' },
      { word: 'puzzle' },
      { word: 'bubble' },
      { word: 'turtle' },
      { word: 'purple' },
      { word: 'middle' },
      { word: 'simple' },
      { word: 'handle' }
    ],
    vocabulary: [
      { word: 'physician', from: 'hb-m15-01' },
      { word: 'prevention', from: 'hb-m15-01' },
      { word: 'doctress', from: 'hb-m15-01' },
      { word: 'Freedmen\'s Bureau', from: 'hb-m15-01' },
      { word: 'discourse', from: 'hb-m15-01' },
      { word: 'sanitary visitor', from: 'hb-m15-02' },
      { word: 'conditions', from: 'hb-m15-02' },
      { word: 'overcrowding', from: 'hb-m15-02' },
      { word: 'dispensary', from: 'hb-m15-02' },
      { word: 'public health', from: 'hb-m15-02' }
    ]
  },
  {
    quarter: 4,
    n: 6,
    pattern: 'Endings -er and -or',
    spelling: [
      { word: 'winter' },
      { word: 'number' },
      { word: 'sister' },
      { word: 'corner' },
      { word: 'color' },
      { word: 'doctor' },
      { word: 'actor' },
      { word: 'visitor' },
      { word: 'sailor' },
      { word: 'author' }
    ],
    vocabulary: [
      { word: 'chemotherapy', from: 'hb-m15-04' },
      { word: 'tumor', from: 'hb-m15-04' },
      { word: 'tissue culture', from: 'hb-m15-04' },
      { word: 'oncology', from: 'hb-m15-04' },
      { word: 'nervous system', from: 'hb-m15-05' },
      { word: 'hydrocephalus', from: 'hb-m15-05' },
      { word: 'shunt', from: 'hb-m15-05' },
      { word: 'virus', from: 'hb-m15-06' },
      { word: 'vaccine', from: 'hb-m15-06' },
      { word: 'immune system', from: 'hb-m15-06' }
    ]
  },
  {
    quarter: 4,
    n: 7,
    pattern: 'Words ending in -y',
    spelling: [
      { word: 'happy' },
      { word: 'sunny' },
      { word: 'funny' },
      { word: 'silly' },
      { word: 'windy' },
      { word: 'candy' },
      { word: 'penny' },
      { word: 'lady' },
      { word: 'pony' },
      { word: 'tiny' }
    ],
    vocabulary: [
      { word: 'log', from: 'hb-m16-01' },
      { word: 'entry', from: 'hb-m16-01' },
      { word: 'hindsight', from: 'hb-m16-01' },
      { word: 'phenology', from: 'hb-m16-01' },
      { word: 'field guide', from: 'hb-m16-02' },
      { word: 'scale bar', from: 'hb-m16-02' },
      { word: 'habit', from: 'hb-m16-02' },
      { word: 'key feature', from: 'hb-m16-02' },
      { word: 'testable question', from: 'hb-m16-03' },
      { word: 'open question', from: 'hb-m16-03' }
    ]
  },
  {
    quarter: 4,
    n: 8,
    pattern: 'Tricky words to know by heart',
    spelling: [
      { word: 'because' },
      { word: 'friend' },
      { word: 'people' },
      { word: 'again' },
      { word: 'enough' },
      { word: 'through' },
      { word: 'laugh' },
      { word: 'answer' },
      { word: 'favorite' },
      { word: 'different' }
    ],
    vocabulary: [
      { word: 'protocol', from: 'hb-m16-04' },
      { word: 'uncertainty', from: 'hb-m16-05' },
      { word: 'limitation', from: 'hb-m16-05' },
      { word: 'replicate', from: 'hb-m16-05' },
      { word: 'measurement', from: 'hb-m16-06' },
      { word: 'referral', from: 'hb-m16-06' },
      { word: 'neurosurgeon', from: 'body-m16-03' },
      { word: 'department', from: 'body-m16-03' },
      { word: 'doubt', from: 'body-m16-03' },
      { word: 'astronaut', from: 'body-m16-04' }
    ]
  }
];

/** Ten spelling words for one week, or null when that week is not in the year. */
export function spellingForWeek(quarter, n) {
  const w = WORD_STUDY_WEEKS.find((x) => x.quarter === quarter && x.n === n);
  return w ? w.spelling : null;
}

/** Ten vocabulary terms for one week, or null when that week is not in the year. */
export function vocabularyForWeek(quarter, n) {
  const w = WORD_STUDY_WEEKS.find((x) => x.quarter === quarter && x.n === n);
  return w ? w.vocabulary : null;
}

export const WORDS_PER_WEEK = 10;
export const WORD_STUDY_WEEK_COUNT = 32;
