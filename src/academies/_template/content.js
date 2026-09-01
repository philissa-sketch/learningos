// ---------------------------------------------------------------------------
// THE TEMPLATE — what every Academy inherits.
//
// Written by hand, not generated. The generator builds an ACADEMY's manifest
// from its own files; this is the other side of that contract, and every line
// in it is a decision about what is generic.
//
// ---- THE RULE FOR PUTTING SOMETHING HERE ----
//
// It belongs here if it would be true for a child studying anything at all. If
// it would look wrong in the folder of a learner whose subjects you have never
// thought about, it is not generic — it is one Academy's answer wearing a
// neutral name, and it belongs in that Academy's folder.
//
// ---- WHAT IS DELIBERATELY ABSENT ----
//
// `subjects` and `lessons`. The loader refuses a template that fills either,
// and the reason is worth keeping in front of whoever adds to this file: a
// default curriculum is not a gentler fallback, it is a school made of nothing
// that still opens. It would hide the exact state the Empty and Configured
// screens exist to show a family. Those two come from a real Academy or not at
// all.
//
// ---- HOW IT MERGES ----
//
// Slot by slot, name by name — an Academy's own answers land on top of these,
// and anything it does not mention it keeps. So an Academy can supply one line
// pool of its own without losing the rest of the guide.
// ---------------------------------------------------------------------------

import { getDailyLine } from './guide/dailyLines.js';

/**
 * The guide, before anybody writes one.
 *
 * §3b: a new Academy must have a guide who doesn't repeat on day one. An
 * Academy that later writes its own lines overrides `getDailyLine` and this
 * disappears behind it.
 */
export const guide = { getDailyLine };

/**
 * The look, before anybody designs one.
 *
 * Loaded as a function so the stylesheet travels in the chunk that needs it
 * rather than every learner's download — same reason as an Academy's own theme.
 *
 * An Academy that ships `academy.css` replaces this entirely. One that does not
 * gets a plain, readable school rather than a white page, which is what makes
 * the Configured state survivable while a family is still setting up.
 */
export const theme = { load: () => import('./theme/template.css') };
