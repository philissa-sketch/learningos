// ---------------------------------------------------------------------------
// THIS SCHOOL'S FIELD TRIPS.
//
// Moved out of src/lib/fieldTrips.js on Sept 20, 2026 — GENERIC_CARRYOVER
// fault 1, "Twenty-one Georgia field trips are hardcoded in the platform".
// The planner that reads this list is the platform's and stays where it was;
// the list is this family's and belongs here, beside their lessons.
//
// WHAT MUST NOT CHANGE, AND WHY IT IS SAFE
//
// Two things in the store depend on the exact strings below:
//
//   1. The seeder matches an existing planner row by `destination`, so a
//      changed string would add a duplicate rather than recognise the trip.
//   2. `fieldTripSyncId()` slugs the destination into the MERGE KEY used when
//      the two computers trade files. A changed key stops the two copies of
//      one trip matching, and the handoff duplicates it.
//
// Nothing here was retyped. The block was cut from the platform file whole and
// pasted, and scripts/verify-field-trip-move.mjs pins every resulting sync id
// so a later edit to a venue name cannot quietly break a merge.
//
// The seeder is also gated on FIELD_TRIP_SEED_VERSION in useAppStore.js. A
// database that has already seeded at the current version does not re-run it
// at all, so a machine with these trips already in its planner is untouched by
// this move. Do not bump that version to "refresh" the list — it would walk
// the rename and backfill passes over rows a parent has since edited.
// ---------------------------------------------------------------------------

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
