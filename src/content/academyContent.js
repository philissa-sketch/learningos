/**
 * ---- WHERE A SCHOOL'S CONTENT COMES FROM ----
 *
 * The bones ask which Academy is signed in. They never name one.
 *
 * Before this file existed, 239 import statements across 94 files named one
 * Academy's folder directly. That is why a second Academy, signed into its own
 * database, rendered the first Academy's school: records separated, curriculum
 * had no concept of whose it was.
 *
 * Now every Academy folder ships a `content.js` filling the same slots. The
 * school reads a slot; the Academy decides what is in it. That is the whole
 * contract.
 *
 * ---- WHY SLOTS AND NOT NAMES ----
 *
 * The obvious fix is to re-point the imports at a shared module that re-exports
 * everything. It does not work, and it is worth writing down why so nobody
 * tries it again.
 *
 * Of the 190 names the school imported, 42 were one curriculum's own words —
 * `aerospaceQ3Exam`, `gardenProjects`, `guitarTheory`. A second Academy cannot
 * supply a thing called `aerospaceQ3Exam`. A shared module listing those names
 * would have hardcoded one child's curriculum into the platform under the
 * appearance of having removed it.
 *
 * So the contract is by ROLE. `lessons` is a slot every Academy can fill.
 * `aerospaceLessons7` is one Academy's answer to it.
 *
 * ---- WHY GLOB AND NOT A LIST ----
 *
 * `import.meta.glob` resolves at build time to one dynamic import per folder
 * that exists. Three consequences, all of them wanted:
 *
 *   1. Vite code-splits each Academy into its own chunk. A learner downloads
 *      their own curriculum and nobody else's — which is the reason content
 *      moved into `academies/<id>/` in the first place, and the reason
 *      `dist/assets/index-*.js` is 4,866 kB today.
 *   2. No file anywhere names an Academy. Adding one is adding a folder.
 *   3. A missing folder is a runtime absence rather than a build error. That is
 *      what makes the acceptance test in docs/LEARNINGOS_PACK_SPEC.md §1 mean
 *      anything: delete an Academy folder and the app still runs, booting to an
 *      empty state that offers to create one.
 *
 * ---- WHY THIS IS LOADED BEFORE THE SCHOOL MOUNTS ----
 *
 * `academyContent()` is synchronous and throws if nothing is loaded. It can be
 * that strict because the Academy shell awaits `loadAcademyContent()` before it
 * imports the school at all. No school module can evaluate before its content
 * exists, so "read before load" is structurally impossible rather than merely
 * discouraged.
 */

/**
 * Every Academy folder present in this build, as a lazy import.
 *
 * The key is the specifier, so the folder name IS the Academy id. Nothing
 * derives one from the other and nothing lists them.
 */
const ACADEMY_FOLDERS = import.meta.glob('../academies/*/content.js');

/**
 * The sixteen slots an Academy folder may fill.
 *
 * This list is the contract between the platform and every Academy that will
 * ever exist. It names roles, never subjects — see the note above.
 *
 * ---- THE SLOT NAMES ARE LEARNINGOS'S OWN, ON PURPOSE ----
 *
 * A parent decision, and it outranks tidiness: **the names stay the ones this
 * platform already uses.** PE is PE. Not `movement`, not `physicalEducation` —
 * PE, because that is what it is called everywhere else here and what it was
 * created as.
 *
 * The reason is not cosmetic. The second Academy was originally meant to be
 * built on these same bones and drifted into a different shape instead, which
 * is the whole reason its content now has to be adapted rather than dropped in.
 * Inventing a third vocabulary in the contract that is supposed to reunite them
 * would repeat exactly that mistake, one layer up.
 *
 * One name had to bend. `scripts/verify-no-learner.mjs` refuses a bare quoted
 * course-provider name anywhere in the platform zone, so the sequences slot
 * carries a suffix. That is the smallest possible change to the existing word,
 * and nothing was loosened in the guard to allow it — see the note in that
 * file about not weakening a zone to make a change pass.
 *
 * ---- ONE SLOT THAT CAME FROM READING A SECOND ACADEMY ----
 *
 * The rest were derived from the one Academy that exists in code, which is
 * exactly how you write a contract only one Academy can honour. So the list was
 * checked against a second Academy's real folder before being frozen. It found
 * one genuine hole:
 *
 *   `placement` — a diagnostic bank: foundation, maths, ELA and science items a
 *                 learner is actually placed by. The first Academy has no
 *                 equivalent because its placement was decided before this code
 *                 existed. But §1 makes placement a state EVERY Academy passes
 *                 through — Configured means "placement pending" — so a
 *                 contract with nowhere to put diagnostics cannot express the
 *                 platform's own middle state. This slot is the platform's, not
 *                 one Academy's; the questionnaire needs it too.
 *
 * The second Academy also carries a catalog of skills it masters and reports on
 * rather than mastering whole lessons. That is NOT a new slot: this platform
 * already has the idea, as the strands hanging off a subject. It is adapted
 * into `subjects` by that Academy's own manifest, which is what a manifest is
 * for. Flagged for review rather than silently reshaped — if the reporting
 * layer turns out to need more than strands can carry, it earns a slot then.
 *
 * A slot an Academy has nothing for is left blank. Blank is expected and costs
 * nothing; it is the difference between a slot and a requirement.
 */
export const CONTENT_SLOTS = Object.freeze([
  'subjects',
  'lessons',
  'placement',
  'timetable',
  'guide',
  'theme',
  'projects',
  'exams',
  'writing',
  'khanSequences',
  'pe',
  'electives',
  'games',
  'academicCenter',
  'rewards',
  'compliance'
]);

/**
 * The slots a school cannot render without.
 *
 * An Academy may legitimately have no electives, no games and no exams — those
 * are things a curriculum adds, and a new Academy on its first morning has none
 * of them. But a school with no subjects, no lessons, no timetable, no guide
 * and no theme is not a partly-built school, it is a blank screen with a nav
 * bar. Those five are refused loudly rather than rendered emptily.
 */
export const REQUIRED_SLOTS = Object.freeze([
  'subjects',
  'lessons',
  'timetable',
  'guide',
  'theme'
]);

/**
 * Thrown when an Academy is registered in the household database but has no
 * content folder in this build.
 *
 * This is a real state, not a corrupt one: an Academy is created at the front
 * door minutes after a family first opens the app, and its folder does not
 * exist until someone authors it. The shell shows that Academy its own empty
 * room. What it must never do is fall through to another Academy's school,
 * which is exactly what happened before this file existed.
 */
export class AcademyContentMissing extends Error {
  constructor(academyId, available) {
    super(
      `No content folder for Academy "${academyId}". ` +
        `This build carries ${available.length} Academy folder(s)` +
        (available.length ? `: ${available.join(', ')}` : '') +
        '. An Academy with no curriculum shows its own empty room — it must ' +
        'never render another Academy\'s school.'
    );
    this.name = 'AcademyContentMissing';
    this.academyId = academyId;
    this.available = available;
  }
}

/** Thrown when a folder exists but does not honour the contract. */
export class AcademyContentIncomplete extends Error {
  constructor(academyId, missing) {
    super(
      `Academy "${academyId}" is missing required content: ${missing.join(', ')}. ` +
        `A school cannot render without ${REQUIRED_SLOTS.join(', ')}.`
    );
    this.name = 'AcademyContentIncomplete';
    this.academyId = academyId;
    this.missing = missing;
  }
}

const specifierFor = (academyId) => `../academies/${academyId}/content.js`;

/** Academy folders carried by this build. Ids only — nothing is loaded. */
export function availableAcademyFolders() {
  return Object.keys(ACADEMY_FOLDERS)
    .map((key) => key.slice('../academies/'.length, -'/content.js'.length))
    .filter((id) => !id.startsWith('_'))
    .sort();
}

/**
 * Does this build carry content for that Academy?
 *
 * Cheap and synchronous, because the shell has to choose a screen before it is
 * willing to await anything.
 */
export function academyHasContent(academyId) {
  return Boolean(academyId && ACADEMY_FOLDERS[specifierFor(academyId)]);
}

/**
 * Which content pack an Academy uses.
 *
 * ---- WHY THIS IS A FIELD AND NOT THE ACADEMY'S ID ----
 *
 * Two reasons, and the second is the one that matters.
 *
 * The small one: an Academy's id is generated on the family's own computer at
 * the front door, with a random suffix so two children sharing a first name do
 * not resolve to one set of records. Nobody can author a folder named after an
 * id that does not exist yet.
 *
 * The real one: §3a. A child can change what they are working toward, and that
 * is the normal case rather than a failure case — *"a career track is a field.
 * It is never a foundation."* If the curriculum folder were the Academy's id,
 * then changing track would mean changing id, which would mean changing
 * database, which would mean losing every hour, grade and record earned so far.
 * The platform would be telling a twelve-year-old that changing her mind costs
 * her a year of school.
 *
 * So the record points at a pack, and the pack can be repointed. Records stay
 * where they are. Falling back to the id keeps every Academy created before
 * this field existed working untouched.
 */
export function contentPackFor(academy) {
  if (!academy) return null;
  return academy.contentPack || academy.id || null;
}

let installed = null;
let installedId = null;

/**
 * Load one Academy's content and make it the one the school reads.
 *
 * Awaited by the Academy shell before the school is imported. Returns the
 * content so a caller can use it without reaching back through
 * `academyContent()`.
 */
export async function loadAcademyContent(academyId) {
  if (!academyId) throw new Error('loadAcademyContent: academyId is required');

  const loader = ACADEMY_FOLDERS[specifierFor(academyId)];
  if (!loader) throw new AcademyContentMissing(academyId, availableAcademyFolders());

  const module = await loader();
  const content = module.default ?? module;

  const missing = REQUIRED_SLOTS.filter((slot) => !content[slot]);
  if (missing.length) throw new AcademyContentIncomplete(academyId, missing);

  installed = content;
  installedId = academyId;
  return content;
}

/**
 * The signed-in Academy's content.
 *
 * Synchronous and strict on purpose. Every caller runs inside a school that the
 * shell only mounted after the await above resolved, so a throw here means a
 * module escaped that ordering — which is a bug worth failing loudly for rather
 * than papering over with an empty object that renders a school with nothing
 * in it.
 */
export function academyContent() {
  if (!installed) {
    throw new Error(
      'academyContent() was called before an Academy was loaded. The school ' +
        'must be mounted by AcademyShell after loadAcademyContent() resolves.'
    );
  }
  return installed;
}

/** Which Academy's content is loaded, or null. */
export function loadedAcademyId() {
  return installedId;
}

/**
 * Drop the loaded content on sign-out.
 *
 * Sign-out reloads the page, so this is belt and braces — but the belt matters:
 * it means a helper firing during teardown throws by name instead of quietly
 * reading curriculum belonging to whoever was here last.
 */
export function unloadAcademyContent() {
  installed = null;
  installedId = null;
}
