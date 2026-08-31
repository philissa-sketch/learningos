/**
 * =============================================================================
 * THE CREW. ONE DATA FILE, SIX PEOPLE, NO EDITOR.
 * =============================================================================
 *
 * ---- WHY ONE FIRST (Aug 30, 2026) ----
 *
 * The parent: **"Yes start with one crew member so we can see how it works."**
 *
 * The right call, and the build spec asks for it too. Seven SVG figures on a
 * laptop that is also running his schoolwork is a real cost, and depth-sorting
 * seven of them is a real piece of work. Building all six and then discovering
 * the shape is wrong is six times the rework.
 *
 * ---- WHY THE FLIGHT ENGINEER IS THE ONE ----
 *
 * Not a coin toss. **He owns exactly one HQ item: the Engineering Workstation.**
 * Every other crew member's post is a dashed outline he has not bought, so any
 * other choice would arrive with nowhere to stand — a crew member you cannot
 * assign is a crew member you cannot test.
 *
 * It is also the right one for him. He wants to be an engineer.
 *
 * ---- THE RULES THAT DO NOT BEND ----
 *
 * From the spec, and none of these is negotiable per-crew:
 *
 *   * Crew are EARNED BY REAL WORK. Never bought, never hired, never rolled for.
 *     There is no coin price on this file and there never will be.
 *   * Six, fixed. No editor, no naming UI, no generation.
 *   * No levels, no morale, no needs. Fallout has those; they would turn his
 *     room into a thing that nags him.
 *   * A crew member who has not arrived is simply NOT THERE. No greyed-out
 *     placeholder, no silhouette, no "coming soon" — the same empty-state rule
 *     the whole of Phase 3 runs on.
 * =============================================================================
 */

/**
 * The roster. Shaped for six from the start so adding the rest is data, not
 * structure — but only the one is live today.
 *
 * `arrival` is a small declarative record rather than a function, so the guard
 * can read the thresholds without executing anything, and so a threshold she
 * wants changed is a number in a table rather than a line of logic.
 */
export const HQ_CREW = [
  {
    id: 'crew-flight-engineer',
    name: 'Flight Engineer',
    /** One line. Who they are, not what they do — the post says what they do. */
    who: 'Flew two shuttle programmes as a systems specialist. Reads a schematic the way most people read a road sign.',
    /**
     * A DIFFERENT FIGURE FROM HIS. The astronaut form, deliberately: a crew
     * member drawn as another cadet reads as a clone of him rather than as
     * somebody who came to help.
     *
     * And no gear. Gear is HIS — bought with his coins, worn by his avatar.
     * Putting his jetpack on a colleague would be the room spending his things.
     */
    avatar: 'avatar-astronaut',
    /** 10 Aerospace lessons mastered, out of the 54 that exist. */
    arrival: { kind: 'lessonsMastered', subject: 'aerospace', count: 10 },
    /** Where they stand if he has never assigned them anywhere. */
    defaultPost: 'hq-desk'
  }
];

/**
 * The other five, written down so the shape is agreed before they are built.
 * NOT exported into the room — this is a plan, and a plan drawn on the wall
 * would be five crew members he has not earned.
 *
 * Thresholds are [HER CALL] per the v2 spec; these are the defaults.
 *
 *   Lab Technician      10 Science Khan units graded      → hq-lab
 *   Systems Programmer  10 Technology units graded        → hq-computer
 *   Navigator           first quarterly mission approved  → hq-holo
 *   Botanist            20 garden log entries             → hq-garden-box
 *   Archivist           first quarter fully complete      → hq-award-wall
 */
export const HQ_CREW_PLANNED = 6;
