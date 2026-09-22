# Exercise demo videos — what went wrong, and where the code went

*This was `peVideoSource.js` until Sept 20, 2026.*

Everything the file DID now lives in `src/content/slots/pe.js`: the sentinel
`HIDDEN_VIDEO` and the function `demoLinkFor`. Neither was ever a fact about
this school. Ranking a parent's own saved video above a curated default is true
for every family, `'none'` is a value written into saved data rather than a
curriculum decision, and a stored Academy cannot hold a function at all — so
while those two lived here, a second family could only get working exercise
videos by someone writing JavaScript and deploying it.

What stays in this folder is what this school actually owns: the pinned video
ids in `exerciseDemoVideos.js` and the date they were checked.

The rule that came out of the incident below — **nothing anywhere builds a
search URL** — moved with the code. `scripts/verify-pe-videos.mjs` now asserts
it against the slot, which is the only file in the app that constructs a
YouTube address at all.

The rest of this file is the original record, unchanged.

---

EXERCISE DEMO VIDEO LINK — her pick, then a checked default, then nothing.

---- WHAT WENT WRONG (Aug 10, 2026) ----

The parent: "Links were added to PE to youtube videos that has nothing in
them. The links was supposed to show how to do the exercise."

Measured against the live channel, all seventy exercises: **34 of them —
49% — opened a page reading "This channel has no content that matched
'Bear Crawl form.'"** Not a broken link, not a wrong video: an empty page.
Cat-Cow Stretch, Glute Bridges, Bird Dog, Dead Bug, Mountain Climbers,
Bear Crawl, Box Breathing, every stretch, every sport.

This file used to build a SEARCH scoped to one creator's channel and hand it
to the student whenever the parent had not saved a video herself. The
reasoning at the time was sound — a channel can be checked where an
individual video cannot, and open YouTube search is the surface worth keeping
a twelve-year-old off. What was never checked is the thing that mattered:
WHETHER THE CHANNEL ACTUALLY HAD A VIDEO FOR EACH EXERCISE. A calisthenics
creator has no reason to have filmed a foam-rolling routine or a soccer
dribbling drill, and half this library is stretching, mobility and sport.

A link that cannot be verified to lead anywhere is not a safer link. It is
the same guess, moved one level up.

---- WHAT SHE ASKED FOR NEXT ----

"I will like to have videos linked so he can see the exercise."

So there are now real defaults — but the fix for a guess is not a better
guess, it is something checkable. exerciseDemoVideos.js pins ONE SPECIFIC
VIDEO ID per exercise, with its title, channel and running time recorded
beside it. Sixty-nine of the seventy resolve; each was confirmed against
YouTube's oEmbed endpoint on the date in that file. Easy Recovery Walk has
none on purpose — nothing in the results demonstrated walking, and he does
not need a video to walk.

The honest limit, stated on the parent screen too: a title, a channel and a
duration can be verified by a machine. The CONTENT of a video cannot. She can
watch and replace any of them from PE > Exercise Videos, and what she saves
always beats the default.

---- ORDER OF PRECEDENCE ----

  1. her master switch off            -> nothing, everywhere
  2. she saved HIDDEN for this one    -> nothing, for this one
  3. she saved a url for this one     -> that, and only that
  4. a curated default exists         -> that specific video
  5. otherwise                        -> nothing

Nothing in this module builds a search URL of any kind. That is the fault
that started this, and verify-pe-videos.mjs fails if it comes back.

Returning null stays a real outcome, not a failure: exerciseLibrary.js
carries full form cues and a safety note for every one of the seventy.
