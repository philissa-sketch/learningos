// ---------------------------------------------------------------------------
// WHO CAN WRITE TO HER.
//
// "I'm her Gigi and her mother will message her as well." Two senders, named
// exactly the way she says them out loud — not "Parent 1" and "Parent 2", and
// not a single anonymous "a grown-up". A note that arrives from a role instead
// of from a person is not the same object.
//
// The sender is stored ON EACH MESSAGE rather than being a setting somewhere.
// Both of them write from the same Grown-Up Corner on the same laptop, so "who
// is writing" cannot be a mode you leave switched on — it has to be chosen for
// each note, or every message her mother writes arrives signed by her
// grandmother.
//
// Adding a third sender later — an aunt, a teacher, her brother — is one entry
// in this list and nothing else.
// ---------------------------------------------------------------------------

export const SENDERS = [
  {
    id: 'gigi',
    name: 'Gigi',
    icon: '🌷',
    /** Her own colour, so a note is recognisable before it is read. */
    accent: 'blush',
    ring: 'border-blush-500',
    wash: 'bg-blush-300/20',
    pill: 'bg-blush-500'
  },
  {
    id: 'mom',
    name: 'Mom',
    icon: '💛',
    accent: 'gold',
    ring: 'border-gold-500',
    wash: 'bg-gold-300/20',
    pill: 'bg-gold-700'
  }
];

/** Little pictures a grown-up can attach in one tap. Faster than typing, and a
 *  note that took four seconds to send gets sent more often than one that took
 *  four minutes — which is the whole point of the feature. */
export const STICKERS = ['🌱', '🌸', '🌟', '🫶', '👏', '🌈', '🍀', '☀️'];

export function senderById(id) {
  return SENDERS.find((s) => s.id === id) || SENDERS[0];
}
