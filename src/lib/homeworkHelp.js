/**
 * ---- FREE HUMAN HELP, FROM A PUBLIC LIBRARY. (Sept 24, 2026.) ----
 *
 * An AI tutor can explain a thing twice. It cannot notice that a student
 * has misread the question, and it is not a second reader for a draft. Many
 * public libraries buy live tutoring for their card holders, and a family
 * that has one should not have to remember it exists.
 *
 * ---- WHY THE ADDRESS IS NOT IN THIS FILE ----
 *
 * The link carries a library account id and belongs to one household, so it
 * is a SETTING, not platform code — stored like the quiz links, seeded once
 * with the address the parent gave, and editable when the card renews or
 * the library changes vendor. This file holds only the shape: three doors,
 * and the order to try them in.
 *
 * The parent asked for it to go in directly rather than behind an empty
 * paste box, so the seed is the real address she supplied. The page was
 * opened and read before it was written down — the standing rule for every
 * link in this app: never guessed.
 */

/** Shape of one door: what to press once the tutoring page loads. */
export const HELP_DOORS = [
  {
    id: 'live-tutor',
    label: 'Live tutor',
    press: 'Press “Live Tutoring”, pick the subject, type the question.',
    blurb: 'A real person, for when you are stuck and have already tried it yourself.'
  },
  {
    id: 'writing-lab',
    label: 'Writing Lab',
    press: 'Press “Writing Lab” and upload the draft.',
    blurb: 'Send a draft, get it back with comments — usually within a day.'
  },
  {
    id: 'question-box',
    label: 'Leave a question',
    press: 'Press “Send Question”.',
    blurb: 'Nobody free right now? Leave the question and an answer comes back within 24 hours.'
  }
];

/**
 * THE ORDER MATTERS MORE THAN THE LINK DOES.
 *
 * A tutor reachable in one tap becomes the first move on every hard
 * problem if nothing says otherwise, and the struggle before the help is
 * where the learning is. So the card carries the order, in his words.
 */
export const HELP_ORDER = [
  'Try it yourself first — a real try, not thirty seconds.',
  'Ask your tutor in the app to explain it another way.',
  'Still stuck? Get a live tutor. That is what they are there for.'
];

/** http(s) only — this link is handed straight to a child to tap. */
export function normalizeHelpUrl(url) {
  const trimmed = String(url || '').trim();
  if (!trimmed) return { ok: true, url: null };
  if (!/^https?:\/\//i.test(trimmed)) return { ok: false, url: null };
  return { ok: true, url: trimmed };
}
