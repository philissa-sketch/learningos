// Field Trip Planner (Part 5, built Aug 6, 2026).
//
// The "Generate Learning Pack" button builds a structured, subject-aware
// TEMPLATE — before / during / after activities the parent reviews, edits, and
// prints. This app has no run-time AI, so the pack is deterministic scaffolding
// (not a live generation), which is exactly the control the parent asked for:
// she decides when to create it and reviews everything before it reaches her
// son. She can paste her own or AI-written content into the notes as well.

import { SUBJECT_LABELS } from '../academies/lamar/subjects.js';

// Subjects a trip can support (multi-select). Uses the app's real subject ids
// so a completed trip's portfolio entry tags to a subject the records know.
export const FIELD_TRIP_SUBJECTS = ['aerospace', 'science', 'socialStudies', 'technology', 'math', 'reading', 'pe'];

export function tripSubjectLabel(id) {
  return SUBJECT_LABELS[id] || id;
}

const SUBJECT_FLAVOR = {
  math: { objective: 'Spot numbers, measurements, shapes, or patterns — estimate a quantity you can see.', vocab: ['estimate', 'scale', 'measurement'] },
  reading: { objective: 'Read a sign, plaque, or exhibit and summarize it in your own words.', vocab: ['summary', 'main idea', 'context'] },
  science: { objective: 'Identify a scientific principle at work and explain why it happens.', vocab: ['hypothesis', 'observation', 'evidence'] },
  socialStudies: { objective: 'Connect what you see to a person, place, or event in history or your community.', vocab: ['primary source', 'timeline', 'community'] },
  aerospace: { objective: 'Find something related to flight, space, or engineering and explain how it works.', vocab: ['thrust', 'lift', 'engineering design'] },
  technology: { objective: 'Notice a machine or technology and describe the problem it solves.', vocab: ['system', 'input & output', 'innovation'] },
  pe: { objective: 'Track how much you walked or moved, and how your body felt.', vocab: ['endurance', 'hydration', 'active minutes'] }
};

/**
 * Build a full Learning Pack for a trip. Deterministic and subject-aware.
 * Returns { before, during, after } with plain arrays/strings the UI renders
 * as checklists and prompts, and the parent can print for the trip.
 */
export function generateLearningPack(trip) {
  const dest = (trip.destination || 'your destination').trim();
  const subjects = Array.isArray(trip.subjects) ? trip.subjects : [];
  const chosen = subjects.length ? subjects : ['aerospace'];

  const objectives = chosen.map((s) => `${tripSubjectLabel(s)}: ${SUBJECT_FLAVOR[s]?.objective || 'Connect what you see to what you are learning.'}`);
  objectives.push('Come back able to explain one new thing you learned.');

  const vocab = Array.from(new Set(chosen.flatMap((s) => SUBJECT_FLAVOR[s]?.vocab || [])));

  return {
    before: {
      background: `Spend 10–15 minutes learning about ${dest} before you go — a short video, its website, or a quick read.`,
      objectives,
      vocabulary: vocab,
      essentialQuestions: [
        `What is ${dest} best known for?`,
        'How does what you will see connect to becoming an engineer?',
        'What questions do you hope to answer on this trip?'
      ],
      safety: [
        'Stay with your group and within sight of an adult.',
        'Follow all posted rules and staff instructions.',
        'Know where to meet if you get separated.'
      ],
      packing: ['Water bottle', 'Snack', 'Notebook & pencil', 'Camera or phone for photos', 'Comfortable shoes']
    },
    during: {
      observation: [
        'Note 3 things that surprised you.',
        'Sketch or describe one thing in detail.',
        'Write down 2 questions to look up later.'
      ],
      photo: [...chosen.map((s) => `Photograph something related to ${tripSubjectLabel(s)}.`), 'Take one photo of yourself at the site for your portfolio.'],
      scavengerHunt: [
        'Find something older than you are.',
        'Find something with moving parts.',
        'Find a number bigger than 1,000.',
        'Find something an engineer helped design.'
      ],
      journalPrompts: [
        'What was the most interesting thing you saw, and why?',
        "What did you learn that you didn't know this morning?"
      ]
    },
    after: {
      reflection: [
        'What surprised you most?',
        'What would you want to explore more?',
        "How did this connect to what you're studying?"
      ],
      writingAssignment: `Write a short report (1–2 paragraphs) about your trip to ${dest}: what you saw, what you learned, and one thing that connects to engineering.`,
      discussion: [`Teach someone at home one thing you learned at ${dest}.`, 'Would you recommend this trip to another student? Why?'],
      portfolioPrompt: 'Add your best photo and 2–3 sentences to your Portfolio.',
      rubric: [
        'Completed the before / during / after activities',
        'Report shows real observations from the trip',
        'Made at least one connection to a subject or to engineering',
        'Neat, complete, and on time'
      ]
    }
  };
}

/**
 * Researched Georgia field-trip options seeded ONCE into the planner (Aug 6,
 * 2026, at the parent's request). Costs and programs are from real research
 * and DO change — treat them as a starting point and confirm on the website /
 * phone in the notes. Travel times are rough driving estimates from the
 * parent's home in Ellenwood, GA 30294. Each trip has a suggested date; the
 * three Clayton County Library trips also carry a `time` and name a real
 * program (with its real day/time) since a library visit is tied to a specific
 * event. The discount angles used: SNAP EBT → Museums for All ($1–5); free
 * library Experience Passes; homeschool rates; and always-free venues.
 */
export const DEFAULT_FIELD_TRIPS = [
  // Scheduled free + closest first, working up to priciest + farthest (so the
  // day-trips that need accommodations land last), roughly every 2 weeks,
  // holidays skipped. The three Clayton County Library trips are anchored to
  // REAL, teen-appropriate (ages 12–18) programs from the library's own
  // brochure, each on its actual date with its actual time. Dates are a
  // starting plan — reschedule or cancel any from the planner.
  { destination: 'FAB STEM Friday — Clayton County Library (Lovejoy)', date: '2026-08-28', time: 'Fri 3:30–4:30 PM (confirm)', cost: 0, travelTimeMin: 20, subjects: ['science', 'technology'], notes: 'FREE — “Teen & Tweens FAB STEAM Fridays,” a hands-on STEM/innovation lab for ages 12–18 ONLY. Recurs the 4th Friday each month at Lovejoy Branch (1721 McDonough Rd, Hampton). Times vary — the flyer says 3:30–4:30 PM but the calendar also listed 9 AM–4:30 PM, so call to confirm. claytonpl.libnet.info/events · 770-473-3850' },
  { destination: 'Homeschool Day — Clayton County Library (Lovejoy)', date: '2026-09-28', time: 'Mon 10:00–11:00 AM', cost: 0, travelTimeMin: 20, subjects: ['reading', 'science', 'socialStudies'], notes: 'FREE — “Hip Hip Hooray It’s Homeschool Day,” a homeschool-family meetup for ages 3–17 (teens welcome). Recurs the 4th Monday each month at Lovejoy Branch (1721 McDonough Rd, Hampton), 10:00–11:00 AM. For accommodations, contact Youth Services. Confirm: claytonpl.libnet.info/events · 770-473-3850' },
  { destination: 'World Space Week: Build a Telescope — Clayton County Library (Morrow)', date: '2026-10-06', time: 'Tue 6:00–7:30 PM', cost: 0, travelTimeMin: 12, subjects: ['aerospace', 'science', 'technology'], notes: 'FREE — “World Space Week”: learn about stars and space and BUILD YOUR OWN TELESCOPE (ages 6–18). Morrow Branch, ONE night only: Tue Oct 6, 2026, 6:00–7:30 PM. This is his aerospace centerpiece — arrive early. Confirm/register: claytonpl.libnet.info/events · 770-473-3850' },
  { destination: 'Chess Club — Clayton County Library (Lovejoy)', date: '2026-09-10', time: 'Thu 4:00–5:00 PM', cost: 0, travelTimeMin: 20, subjects: ['math'], notes: 'FREE — a structured chess club for all levels (ages 12–18 welcome), great for strategy and logical thinking. Recurs EVERY Thursday, 4:00–5:00 PM, Lovejoy Branch (1721 McDonough Rd, Hampton). Ask for Mr. Raymond. Easy weekly anchor — pick any Thursday. claytonpl.libnet.info/events · 770-473-3850' },
  { destination: 'Kids STEAM — Clayton County Library (Lovejoy)', date: '2026-09-08', time: 'Tue 2:00–5:00 PM', cost: 0, travelTimeMin: 20, subjects: ['science', 'technology', 'math'], notes: 'FREE — hands-on STEAM activities (ages up to 12). Runs monthly (the brochure shows roughly the 2nd Tuesday), 2:00–5:00 PM, Lovejoy Branch. Confirm the exact date each month: claytonpl.libnet.info/events · 770-473-3850' },
  { destination: 'Fire & Emergency Services (Lithium Batteries) — Clayton County Library (Forest Park)', date: '2026-10-21', time: 'Wed 4:30–5:30 PM', cost: 0, travelTimeMin: 12, subjects: ['science', 'technology'], notes: 'FREE — Forest Park Fire & Emergency Services on fire safety and “lithium batteries: how safe are they?” — real engineering/battery science. Forest Park Branch, Wed Oct 21, 2026, 4:30–5:30 PM. Confirm: claytonpl.libnet.info/events · 770-473-3850' },
  { destination: 'Michael C. Carlos Museum (Emory)', date: '2026-10-02', cost: 0, travelTimeMin: 30, subjects: ['socialStudies', 'reading'], notes: 'FREE with a library Experience Pass (6 admissions), or homeschool $8/student (adults free). Ancient Egypt, Greece & the Americas with docent tours. Emory, Atlanta.' },
  { destination: 'Center for Puppetry Arts', date: '2026-10-16', cost: 0, travelTimeMin: 30, subjects: ['reading', 'technology'], notes: 'FREE or 25% off with a library Experience Pass. Global puppetry + the Jim Henson collection; puppet-building is hands-on STEAM. Midtown Atlanta.' },
  { destination: 'Panola Mountain State Park', date: '2026-10-30', cost: 5, travelTimeMin: 12, subjects: ['science', 'pe', 'socialStudies'], notes: 'Practically in your backyard (Stockbridge). Hiking, a rare granite monadnock, guided eco-hikes. $5 parking — or FREE + a Discovery Backpack (binoculars) with a library Experience Pass. Also nearby: Davidson-Arabia Mountain in Lithonia (free). explore.gastateparks.org/Homeschool/Events' },
  { destination: 'Chattahoochee Nature Center', date: '2026-11-13', cost: 0, travelTimeMin: 55, subjects: ['science', 'pe'], notes: 'FREE with a library Experience Pass (4 admissions) — check one out at your library. Trails, birds of prey, river boardwalks. Roswell.' },
  { destination: 'Mimms Museum of Technology and Art', date: '2026-12-04', cost: 0, travelTimeMin: 55, subjects: ['technology', 'aerospace'], notes: 'FREE with a library Experience Pass (4 admissions). Computing & technology history plus aerospace/robotics. Roswell.' },
  { destination: 'Children’s Museum of Atlanta', date: '2026-12-18', cost: 5, travelTimeMin: 30, subjects: ['science', 'technology', 'math'], notes: 'Your EBT card = Museums for All: $5/person for up to 4 — bring the physical card + a photo ID with a matching name. Monthly Family Free Day too. Hands-on STEM. Downtown Atlanta.' },
  { destination: 'Fernbank Museum of Natural History', date: '2027-01-08', cost: 5, travelTimeMin: 30, subjects: ['science', 'technology'], notes: 'Dinosaurs, natural history, science shows, 75-acre forest. Homeschool: bring your State Letter of Intent for the reduced rate — FieldTrips@FernbankMuseum.org / 404-929-6320. With EBT, ask about Museums for All (~$5). Atlanta.' },
  { destination: 'Museum of Aviation', date: '2027-01-22', cost: 0, travelTimeMin: 80, subjects: ['aerospace', 'technology', 'socialStudies'], notes: 'FREE admission (donations welcome) — one of the largest U.S. Air Force museums, dozens of historic aircraft. Annual H+STEM Day in January. Warner Robins / Robins AFB — a day trip. museumofaviation.org' },
  { destination: 'Go Fish Education Center', date: '2027-02-05', cost: 0, travelTimeMin: 90, subjects: ['science'], notes: 'FREE with a library Experience Pass. Aquariums, fishing & aquatic ecology, hands-on. Perry — a day trip.' },
  { destination: 'Atlanta History Center', date: '2027-02-19', cost: 7, travelTimeMin: 35, subjects: ['socialStudies'], notes: 'Homeschool Day — 3rd Thursday monthly, 10:30–3:30 — $6.50/child, $8.50/adult (~65% off). Civil War, Southern history, gardens. Buckhead, Atlanta.' },
  { destination: 'Delta Flight Museum', date: '2027-03-05', cost: 15, travelTimeMin: 20, subjects: ['aerospace', 'technology', 'science'], notes: 'Real jets incl. a 747 + a flight simulator — your aerospace anchor trip. Youth (5–17) $15, adults $20, under 5 free; check deltamuseum.org for discount codes. Hapeville, by the airport.' },
  { destination: 'Coca-Cola Space Science Center', date: '2027-03-19', cost: 8, travelTimeMin: 100, subjects: ['aerospace', 'science'], notes: 'Planetarium & space exhibits — low-cost. Call 706-649-1477 for the homeschool/group rate. Columbus — a day trip.' },
  { destination: 'Tellus Science Museum', date: '2027-04-02', cost: 12, travelTimeMin: 75, subjects: ['science', 'aerospace', 'technology'], notes: "Planetarium + 'Exploring the Solar System,' fossils & minerals, space gallery. Homeschool field trip $12/student (10-student min), 1:30–3pm — scheduling@tellusmuseum.org / 770-606-5699. Bring your EBT card to ask about Museums for All. Cartersville." },
  { destination: 'Georgia Aquarium', date: '2027-04-16', cost: 22, travelTimeMin: 30, subjects: ['science'], notes: 'Homeschool Days — 2nd Tuesday monthly, Sep–Mar — steeply discounted vs. ~$40 general, with guest speakers. Register ahead; price varies (~$20). Downtown Atlanta.' },
  { destination: 'National Museum of the Mighty Eighth Air Force', date: '2027-04-30', cost: 6, travelTimeMin: 200, subjects: ['aerospace', 'socialStudies'], notes: 'Homeschool $6/student. WWII aviation — a B-17, missions, exhibits. Annual H+STEM Day in January. Pooler, near Savannah — the farthest trip; plan an overnight. Save toward it early.' }
];

/**
 * ===========================================================================
 * A FIELD TRIP'S STABLE IDENTITY. (Aug 28, 2026.)
 * ===========================================================================
 *
 * The parent: *"there are multiple repeat field trips listed."*
 *
 * ---- WHY THEY DOUBLED ----
 *
 * A seeded trip carried **no `syncId`**, so the two-computer merge fell back to
 * a key built out of `destination|date` — and both halves of that key are
 * fields the app itself rewrites:
 *
 *   - step (b) of the seeder BACKFILLS a date onto an undated trip
 *   - `LIBRARY_TRIP_RENAMES` RENAMES three trips and re-dates them
 *
 * So the moment one machine ran a newer seed than the other, the same trip had
 * two different keys, and the import that was supposed to reconcile them added
 * a second copy instead. Every later import could add another.
 *
 * **The rule this earns, and it is the same one the grammar roster earned three
 * days ago: never key a record on a field you also rewrite.** A merge key has
 * to be something the app promises never to change.
 *
 * ---- WHAT THE KEY IS NOW ----
 *
 * A slug of the trip's CANONICAL destination — canonical meaning the rename map
 * is resolved first, so a row still wearing the old library name produces the
 * same id as the renamed one and the two collapse instead of coexisting. The
 * date is deliberately not in it: a date is exactly the thing that moves.
 */
export const LIBRARY_TRIP_RENAMES = {
  'Local Public Library — STEM & Homeschool Programs': 'FAB STEM Friday — Clayton County Library (Lovejoy)',
  'Clayton County Library — Forest Park Branch (Family & Homeschool)': 'Homeschool Day — Clayton County Library (Lovejoy)',
  'Clayton County Library — Teen STEM & Tech (HQ, Jonesboro)': 'World Space Week: Build a Telescope — Clayton County Library (Morrow)'
};

/** The destination a trip should be filed under, with any rename resolved. */
export function canonicalTripDestination(destination) {
  const d = String(destination == null ? '' : destination).trim();
  return LIBRARY_TRIP_RENAMES[d] || d;
}

/**
 * The merge key for a field trip. Same trip, same id, on both computers.
 *
 * Returns null for a trip with no destination — an unidentifiable row is left
 * alone rather than given a made-up identity it could then collide on.
 */
export function fieldTripSyncId(destination) {
  const canon = canonicalTripDestination(destination);
  const slug = canon
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug ? 'ft::' + slug : null;
}

/**
 * Which of two copies of the same trip to keep.
 *
 * Higher wins. Evidence of real work outranks everything: a completed trip, or
 * one carrying hours, a learning pack or a portfolio entry, is a record — the
 * other copy is the accident. **A duplicate cleanup that deletes the finished
 * copy is worse than the duplicates.**
 */
export function fieldTripKeepScore(trip) {
  if (!trip) return -1;
  let score = 0;
  if (trip.status === 'completed') score += 1000;
  if (trip.portfolioEntryId) score += 100;
  if (trip.learningPack) score += 50;
  if (Number(trip.hours) > 0) score += 25;
  if (trip.completedAt) score += 10;
  if ((trip.date || '').trim()) score += 5;
  if ((trip.notes || '').trim()) score += 1;
  return score;
}


/** Does this row hold real work? A row that does is a record, never deleted. */
export function fieldTripCarriesWork(trip) {
  if (!trip) return false;
  return (
    trip.status === 'completed' ||
    Boolean(trip.portfolioEntryId) ||
    Boolean(trip.learningPack) ||
    Number(trip.hours) > 0
  );
}

/**
 * ===========================================================================
 * THE DEDUPE THAT DID NOT DEDUPE. (Aug 29, 2026.)
 * ===========================================================================
 *
 * The parent, the day after the first attempt shipped:
 * *"the field trip planer is worse than before."*
 *
 * ---- WHY YESTERDAY'S FIX CHANGED NOTHING ----
 *
 * Yesterday's repair backfilled the canonical id onto any trip that had none,
 * then grouped by id and collapsed the groups. It carried this line:
 *
 *     if (t.syncId) continue;   // don't overwrite an id already set
 *
 * That reads as caution. On her database it was the whole bug. Her 85 rows do
 * not have a MISSING id — every one of them carries a STALE id: 21 in the old
 * `destination|date` fallback form, 63 as random UUIDs the import handed out.
 * So the backfill skipped all 85, the four copies of each trip landed in four
 * different groups, no group ever reached size 2, and nothing collapsed.
 *
 * **The rule: a derived key is not an identity.** `destination|date` and an
 * import's throwaway UUID were both computed by the app because it had nothing
 * better; neither is something to protect. Only an id already in canonical
 * `ft::` form is a real identity, and only that one is preserved.
 *
 * ---- AND THE THING THAT ALMOST GOT DESTROYED ----
 *
 * Normalizing every row of a destination to one id means two DELIBERATE visits
 * to the same place — she plans Chess Club "any Thursday", and it recurs
 * weekly — become one group, and the second one gets deleted as a duplicate.
 * A dedupe that eats a trip she planned on purpose is not a fix.
 *
 * So a losing row is only ever deleted when it is a genuine clone: same
 * canonical destination AND the same date (or no date at all) AND no work on
 * it. A row on a different date is a different visit — it is kept, and it
 * keeps an id of its own so no later import merges it into the winner either.
 *
 * Pure and returns a plan rather than writing, so this is testable against the
 * real shape of her export instead of against the store's punctuation.
 *
 * @param {Array} trips  every field trip row
 * @returns {{ idWrites: Array<{id:*, syncId:string}>, dropIds: Array }}
 */
export function planFieldTripDedupe(trips) {
  const rows = (Array.isArray(trips) ? trips : []).filter(Boolean);

  const byDestination = new Map();
  for (const t of rows) {
    const base = fieldTripSyncId(t.destination);
    // A row with no destination cannot be identified, so it is never grouped,
    // never renamed and never deleted. Left alone is the safe answer.
    if (!base) continue;
    const bucket = byDestination.get(base);
    if (bucket) bucket.push(t);
    else byDestination.set(base, [t]);
  }

  const idWrites = [];
  const dropIds = [];

  for (const [base, group] of byDestination) {
    // Most evidence of real work wins; oldest wins a tie, so the same row wins
    // on both computers and the winner does not change between hydrates.
    const ranked = [...group].sort((a, b) => {
      const byScore = fieldTripKeepScore(b) - fieldTripKeepScore(a);
      if (byScore !== 0) return byScore;
      return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
    });

    const winner = ranked[0];
    if (winner.syncId !== base) idWrites.push({ id: winner.id, syncId: base });
    const winnerDate = String(winner.date || '').trim();

    for (const other of ranked.slice(1)) {
      const otherDate = String(other.date || '').trim();
      const sameVisit = otherDate === '' || otherDate === winnerDate;
      if (sameVisit && !fieldTripCarriesWork(other)) {
        dropIds.push(other.id);
        continue;
      }
      // Kept: a second visit she planned, or a copy carrying work she can look
      // at herself. It needs an id that is NOT the winner's.
      const suffix = String(other.createdAt || other.id || dropIds.length)
        .replace(/[^a-zA-Z0-9]+/g, '')
        .slice(0, 24);
      const want = base + '#' + suffix;
      const keptIsCanonical = typeof other.syncId === 'string' && other.syncId.startsWith(base + '#');
      if (!keptIsCanonical && want !== base + '#') idWrites.push({ id: other.id, syncId: want });
    }
  }

  return { idWrites, dropIds };
}
