// ---------------------------------------------------------------------------
// THE THREE QUIZ PLATFORMS SHE ASKED FOR. (Aug 20, 2026.)
//
// The parent: **"add blooket, kahoot, and gimkit to Lamar game section"**
//
// ---- WHY THESE ARE NOT IN externalGamesLibrary.js ----
//
// Everything in that file is a link a boy can open and play. These three are
// not that. All three are TEACHER-HOSTED: she builds or assigns a set, and he
// joins with a code or an assignment link that is different every time. A
// bookmark to the homepage would land him on a "enter your game code" box he
// cannot fill in — which is the same dead end as a schedule that names work he
// cannot reach, and this project has already shipped that twice.
//
// ---- WHY THERE ARE NO URLs IN THIS FILE ----
//
// externalGamesLibrary.js states the rule this project follows for links:
// "Every link below was verified live via direct fetch/search before being
// added ... never guessed."
//
// The three homepages could not be fetched in the session that added this
// feature, so they are NOT written down here. Guessing a URL for a child to
// tap would break that rule for no benefit: the only address that actually
// gets him into a game is the one SHE pastes, and she pastes it either way.
//
// So a platform is a NAME and an EXPLANATION here. The link is hers.
// ---------------------------------------------------------------------------

export const QUIZ_PLATFORMS = [
  {
    id: 'blooket',
    label: 'Blooket',
    emoji: '🎯',
    /** What he is looking at when he gets there, so the card is not just a name. */
    blurb: 'Answer questions to earn and upgrade Blooks. Mom picks the question set.',
    /** Shown to HER, beside the box she pastes into. */
    parentHint: 'Paste the Play link or the assignment link from your Blooket dashboard.'
  },
  {
    id: 'kahoot',
    label: 'Kahoot',
    emoji: '🟣',
    blurb: 'Fast timed quiz rounds. Mom starts the game or assigns it as a challenge.',
    parentHint: 'Paste the challenge link, or the join link with the game PIN.'
  },
  {
    id: 'gimkit',
    label: 'Gimkit',
    emoji: '💰',
    blurb: 'Answer questions to earn cash and buy upgrades. Mom picks the kit.',
    parentHint: 'Paste the join link or the assignment link from your Gimkit dashboard.'
  }
];

/** Ids only, for the guards and for anything that needs to iterate safely. */
export const QUIZ_PLATFORM_IDS = QUIZ_PLATFORMS.map((p) => p.id);

export function quizPlatformById(id) {
  return QUIZ_PLATFORMS.find((p) => p.id === id) || null;
}
