// ---------------------------------------------------------------------------
// THE HERB LIBRARY — 24 cards.
//
// This is reference material, not lessons. It exists in version 1 because the
// app needs to feel like hers from the first screen, and because a child who
// wants to be a herbalist should be able to look something up.
//
// WHAT EVERY CARD MAY SAY: what the plant is, where it grows, which part people
// use, how to tell it apart from things it resembles, and how people have used
// it historically or culturally.
//
// WHAT NO CARD SAYS, EVER: that a plant treats, cures, helps or is good for any
// condition; any amount, dose, strength or preparation to take; or anything that
// reads as instructions to a nine-year-old about putting a plant in her body.
// `traditionalUse` is written in the past tense and about PEOPLE — "has long
// been brewed as a bedtime tea" — never as advice to the reader.
//
// scripts/verify-itembank.mjs greps this file for banned phrasing and fails the
// build if any of it appears. That check is the reason this comment can be
// trusted six months from now.
// ---------------------------------------------------------------------------

export const SAFETY_LINE =
  'Always ask a grown-up before touching, picking, or using any plant.';

export const herbs = [
  {
    id: 'chamomile',
    name: 'Chamomile',
    latin: 'Matricaria chamomilla',
    emoji: '🌼',
    partsUsed: 'Flowers',
    grows: 'Sunny, open ground. Self-seeds easily and often turns up uninvited.',
    lookFor: 'Small white petals around a domed yellow centre. The centre is hollow if you slice it — that is how it is told apart from look-alike daisies.',
    traditionalUse: 'Has been dried and brewed as a bedtime tea across Europe and North Africa for thousands of years.',
    fact: 'That yellow "button" in the middle is not one flower. It is hundreds of tiny flowers packed together.'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    latin: 'Lavandula angustifolia',
    emoji: '💜',
    partsUsed: 'Flower buds',
    grows: 'Dry, gravelly soil and full sun. Hates wet feet.',
    lookFor: 'Grey-green narrow leaves and purple flower spikes on square stems.',
    traditionalUse: 'Romans added it to bathwater — the name comes from the Latin lavare, "to wash".',
    fact: 'Lavender is in the mint family. Roll a stem between your fingers and you will feel it is square, not round — that square stem is the family signature.'
  },
  {
    id: 'peppermint',
    name: 'Peppermint',
    latin: 'Mentha × piperita',
    emoji: '🌿',
    partsUsed: 'Leaves',
    grows: 'Damp soil, part shade. Spreads underground and will take over a bed.',
    lookFor: 'Square stems, paired leaves opposite each other, sharp cool smell when crushed.',
    traditionalUse: 'Brewed as a tea and used as a flavouring in cooking for centuries across many cultures.',
    fact: 'Peppermint is a natural hybrid — a cross between watermint and spearmint that happened on its own.'
  },
  {
    id: 'calendula',
    name: 'Calendula',
    latin: 'Calendula officinalis',
    emoji: '🧡',
    partsUsed: 'Petals',
    grows: 'Almost anywhere sunny. Flowers from spring until frost.',
    lookFor: 'Bright orange or yellow daisy-like flowers, sticky green stems.',
    traditionalUse: 'Petals were used to colour butter and cheese, and it was once called "poor man\'s saffron".',
    fact: 'The flowers open in the morning and close at dusk, which is where the name comes from — calendae, the first day of the Roman month.'
  },
  {
    id: 'lemon-balm',
    name: 'Lemon Balm',
    latin: 'Melissa officinalis',
    emoji: '🍋',
    partsUsed: 'Leaves',
    grows: 'Part shade, ordinary soil. Another enthusiastic spreader.',
    lookFor: 'Crinkled heart-shaped leaves, square stems, strong lemon smell when rubbed.',
    traditionalUse: 'Kept in monastery gardens across medieval Europe and planted near beehives.',
    fact: 'Melissa is Greek for honeybee. Beekeepers rubbed the leaves inside empty hives to encourage swarms to move in.'
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    latin: 'Salvia rosmarinus',
    emoji: '🌲',
    partsUsed: 'Leaves',
    grows: 'Full sun, dry soil, Mediterranean conditions. Can become a small shrub.',
    lookFor: 'Stiff needle-like leaves, dark green on top and pale underneath, resinous smell.',
    traditionalUse: 'Carried at weddings and funerals in Europe as a symbol of remembrance.',
    fact: 'The name means "dew of the sea" — it grows wild on Mediterranean coastal cliffs.'
  },
  {
    id: 'thyme',
    name: 'Thyme',
    latin: 'Thymus vulgaris',
    emoji: '🌾',
    partsUsed: 'Leaves and flowering tops',
    grows: 'Poor, well-drained soil and full sun. Thrives on neglect.',
    lookFor: 'Tiny oval leaves on woody stems, low and creeping.',
    traditionalUse: 'Burned as incense by the ancient Greeks and used in Egyptian preservation practices.',
    fact: 'Bees that feed on wild thyme produce a honey that has been prized since ancient Greece.'
  },
  {
    id: 'elderberry',
    name: 'Elder',
    latin: 'Sambucus nigra',
    emoji: '🫐',
    partsUsed: 'Flowers and ripe berries',
    grows: 'Hedgerows, field edges, damp ground. A large shrub or small tree.',
    lookFor: 'Flat creamy flower heads in early summer; dark purple berry clusters in autumn. Leaves grow in opposite pairs.',
    traditionalUse: 'Flowers were made into cordials and the berries into preserves across Britain and Europe.',
    fact: 'Elder is one of the plants where knowing the ripe stage matters most — this is exactly the kind of plant you learn from an expert in person, never from a picture.'
  },
  {
    id: 'ginger',
    name: 'Ginger',
    latin: 'Zingiber officinale',
    emoji: '🫚',
    partsUsed: 'Rhizome (underground stem)',
    grows: 'Warm, humid places. Grown in pots in cooler climates.',
    lookFor: 'Knobbly tan-coloured rhizome; tall reed-like leaves above ground.',
    traditionalUse: 'One of the earliest traded spices, carried along Asian trade routes for well over two thousand years.',
    fact: 'The knobbly part is not a root. It is a rhizome — a stem that grows sideways underground.'
  },
  {
    id: 'dandelion',
    name: 'Dandelion',
    latin: 'Taraxacum officinale',
    emoji: '🌻',
    partsUsed: 'Leaves, flowers and root',
    grows: 'Everywhere. Lawns, cracks in pavement, anywhere with a little soil.',
    lookFor: 'Jagged leaves in a flat rosette, hollow unbranched stem with milky sap, single yellow flower per stem.',
    traditionalUse: 'Young leaves were eaten as a spring green across Europe, Asia and North America.',
    fact: 'The name comes from the French dent de lion — lion\'s tooth — for the jagged leaf edge.'
  },
  {
    id: 'nettle',
    name: 'Stinging Nettle',
    latin: 'Urtica dioica',
    emoji: '🌱',
    partsUsed: 'Young leaves (cooked)',
    grows: 'Rich, disturbed soil. Often marks ground where people or animals have lived.',
    lookFor: 'Heart-shaped toothed leaves in opposite pairs, square stems, fine stinging hairs.',
    traditionalUse: 'Cooked as a spring vegetable and spun into cloth — nettle fabric was used in Europe for centuries.',
    fact: 'The sting comes from tiny hollow hairs that break like miniature needles. Heat destroys them completely, which is why cooked nettle does not sting.'
  },
  {
    id: 'sage',
    name: 'Sage',
    latin: 'Salvia officinalis',
    emoji: '🍃',
    partsUsed: 'Leaves',
    grows: 'Full sun, dry well-drained soil.',
    lookFor: 'Soft grey-green pebbled leaves, square stems, woody base.',
    traditionalUse: 'A staple of European kitchen gardens and a common seasoning since Roman times.',
    fact: 'The Latin name shares a root with salvere, "to be well" — which tells you what people thought of it, not what it does.'
  },
  {
    id: 'yarrow',
    name: 'Yarrow',
    latin: 'Achillea millefolium',
    emoji: '🤍',
    partsUsed: 'Flowering tops and leaves',
    grows: 'Meadows, roadsides, poor soil. Very tough.',
    lookFor: 'Flat white flower clusters and extremely fine feathery leaves.',
    traditionalUse: 'Named after Achilles in Greek legend; carried by soldiers in many cultures.',
    fact: 'Millefolium means "thousand leaves" — a single yarrow leaf is divided so finely it looks like a feather.'
  },
  {
    id: 'plantain',
    name: 'Plantain (Broadleaf)',
    latin: 'Plantago major',
    emoji: '🍀',
    partsUsed: 'Leaves',
    grows: 'Footpaths, lawns, compacted ground. Tolerates being walked on.',
    lookFor: 'Oval ribbed leaves in a flat rosette with parallel veins that stay stringy when the leaf tears.',
    traditionalUse: 'Followed European settlers around the world so reliably that some Indigenous peoples of North America called it "white man\'s footprint".',
    fact: 'Nothing to do with the banana-like plantain you cook — two completely unrelated plants sharing a name.'
  },
  {
    id: 'mullein',
    name: 'Mullein',
    latin: 'Verbascum thapsus',
    emoji: '🕯️',
    partsUsed: 'Leaves and flowers',
    grows: 'Dry waste ground, roadsides, gravel.',
    lookFor: 'Enormous soft furry grey-green leaves in year one; a tall yellow flower spike in year two.',
    traditionalUse: 'The dried stalks were dipped in tallow and burned as torches in Roman times.',
    fact: 'Mullein is biennial: leaves the first year, flower spike the second, then it dies. Two very different-looking plants that are the same plant.'
  },
  {
    id: 'rose-hips',
    name: 'Rose Hips',
    latin: 'Rosa canina',
    emoji: '🌹',
    partsUsed: 'Fruit (hips)',
    grows: 'Hedgerows and scrubland. The fruit follows the flower.',
    lookFor: 'Bright red-orange oval fruits left on the rose bush after the petals fall.',
    traditionalUse: 'Gathered by British schoolchildren during the Second World War when imported citrus was unavailable.',
    fact: 'A rose hip is the fruit of the rose. The flower turns into it once it has been pollinated.'
  },
  {
    id: 'holy-basil',
    name: 'Holy Basil (Tulsi)',
    latin: 'Ocimum tenuiflorum',
    emoji: '🪴',
    partsUsed: 'Leaves',
    grows: 'Warm climates, full sun. Grown in pots elsewhere.',
    lookFor: 'Slightly hairy green or purple leaves, square stems, strong clove-like scent.',
    traditionalUse: 'Grown in courtyards across India for centuries and central to daily household ritual.',
    fact: 'It is in the mint family too — square stem, opposite leaves, the same family signature as lavender and peppermint.'
  },
  {
    id: 'red-clover',
    name: 'Red Clover',
    latin: 'Trifolium pratense',
    emoji: '🌸',
    partsUsed: 'Flower heads',
    grows: 'Meadows and lawns. Often planted deliberately to improve soil.',
    lookFor: 'Three leaflets with a pale V-shaped mark, round pink-purple flower heads.',
    traditionalUse: 'Grown as a pasture crop and dried for tea across Europe and North America.',
    fact: 'Clover feeds the soil. Bacteria living in its roots pull nitrogen out of the air and leave the ground richer than they found it.'
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus (Roselle)',
    latin: 'Hibiscus sabdariffa',
    emoji: '🌺',
    partsUsed: 'Calyces (the fleshy part behind the flower)',
    grows: 'Hot climates. West Africa, the Caribbean, Central America.',
    lookFor: 'Deep red fleshy cups left behind after the pale flower drops.',
    traditionalUse: 'Brewed as a bright red iced drink — bissap in Senegal, sorrel in the Caribbean, agua de Jamaica in Mexico.',
    fact: 'The red part is not a petal. It is the calyx — the cup that protected the flower bud before it opened.'
  },
  {
    id: 'fennel',
    name: 'Fennel',
    latin: 'Foeniculum vulgare',
    emoji: '🌾',
    partsUsed: 'Seeds, fronds and bulb',
    grows: 'Sunny open ground. Can reach head height.',
    lookFor: 'Feathery thread-like leaves, yellow flower umbrellas, strong aniseed smell.',
    traditionalUse: 'Seeds have been chewed after meals in India and around the Mediterranean for centuries.',
    fact: 'Fennel is in the carrot family — and so are several genuinely dangerous plants that look similar. This is a family where identification is done with an expert, every time.'
  },
  {
    id: 'echinacea',
    name: 'Echinacea (Purple Coneflower)',
    latin: 'Echinacea purpurea',
    emoji: '🟣',
    partsUsed: 'Flowers, leaves and root',
    grows: 'Prairies and open ground in North America. Full sun.',
    lookFor: 'Drooping pink-purple petals around a raised spiky orange centre.',
    traditionalUse: 'Used by Plains Indigenous nations long before it appeared in European or American writing.',
    fact: 'Echinos is Greek for hedgehog — for the spiky centre, which really is prickly to touch.'
  },
  {
    id: 'oat-straw',
    name: 'Oat Straw',
    latin: 'Avena sativa',
    emoji: '🌾',
    partsUsed: 'Green stems, harvested before the grain hardens',
    grows: 'Cool climates. A cultivated field crop.',
    lookFor: 'Ordinary oat plants picked at the "milky" stage, when a squeezed seed releases white liquid.',
    traditionalUse: 'Harvested at the milky stage and dried for tea in northern Europe.',
    fact: 'Same plant as your breakfast oats — just picked weeks earlier, at a completely different stage.'
  },
  {
    id: 'marshmallow',
    name: 'Marshmallow',
    latin: 'Althaea officinalis',
    emoji: '🤍',
    partsUsed: 'Root and leaves',
    grows: 'Damp ground and salt marshes.',
    lookFor: 'Soft velvety grey-green leaves and pale pink flowers.',
    traditionalUse: 'The root was boiled with sugar in ancient Egypt and again in 19th-century France to make a sweet — the ancestor of the modern marshmallow.',
    fact: 'The sweet is named after the plant, not the other way round. Modern marshmallows contain none of it.'
  },
  {
    id: 'mint-spear',
    name: 'Spearmint',
    latin: 'Mentha spicata',
    emoji: '🌿',
    partsUsed: 'Leaves',
    grows: 'Damp soil, sun or part shade. Spreads like its cousin.',
    lookFor: 'Bright green pointed leaves with sharply toothed edges, square stems, softer smell than peppermint.',
    traditionalUse: 'Central to Moroccan mint tea and to cooking across the Middle East and South Asia.',
    fact: 'Spearmint is one of peppermint\'s two parents. Watermint is the other.'
  }
];

export function getHerb(id) {
  return herbs.find((h) => h.id === id) || null;
}
