// ---------------------------------------------------------------------------
// Default recommended daily homeschool schedule. Parents can fully
// customize this (edit times/labels, add/remove/reorder blocks) — this is
// only the starting point new users see and the target of "Reset to
// Recommended Schedule".
//
// Two labels below are deliberately worded to cover more than one activity,
// per two real scheduling gaps found and resolved during a full
// curriculum-builder audit of PROJECT_PLAN.md (see Part 5 there):
//   - block-7 ("Language Arts & Writing Journal") covers both Khan
//     Academy Language Arts and the separate, graded Writing Journal —
//     they're functionally distinct (grammar/vocab drills vs. real
//     composition) but share one generic, parent-customizable time slot.
//   - block-9 now names Social Studies alongside Aerospace/Coding/
//     Robotics/STEM Project — Social Studies rotates into this existing
//     block rather than getting its own dedicated slot, confirmed with
//     the parent ahead of Social Studies' first real lessons.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// MORNING RETIME, Aug 9 2026 — with the parent, in her words: "the time for
// reading should be less than 45min and language arts and writing should be
// longer. 15 minutes for reading and I will have him read later in the day
// before bed."
//
// Independent Reading 45 -> 15 min. Language Arts & Writing Journal 30 -> 60.
// The thirty minutes moves from one block to the other; NOTHING is added to or
// taken off the school day. Total instructional time is 5 hr 15 min before and
// after, which is what keeps the Georgia 4.5 hr/day average intact.
//
// WHAT MOVES AND WHAT DOES NOT. Only blocks 3-7 change. block-7 keeps its
// 13:30 END, so Spelling & Vocabulary, PE, the rotating block and Guitar all
// sit at exactly the times they sat at yesterday. The day still starts 8:30 and
// still ends 3:15.
//
// THE ONE REAL TRADE, stated plainly rather than buried: lunch moves from 12:00
// to 11:30. Thirty minutes came out of the morning and nothing before lunch
// grew, so lunch either moves earlier or the whole day ends later. Moving lunch
// was chosen because the alternative pushed Guitar to 3:45 and that block was
// deliberately placed at the end of the school day as a habit cue.
//
// Reading is NOT reduced overall — it moves. Fifteen minutes here, and the real
// reading happens at bedtime, which is the parent's own arrangement and not
// something this file tracks.
// ---------------------------------------------------------------------------

export const defaultSchedule = [
  { id: 'block-1', startTime: '08:30', endTime: '09:00', label: 'Morning Meeting, Goals & Calendar', colorKey: 'neutral' },
  { id: 'block-2', startTime: '09:00', endTime: '10:00', label: 'Mathematics', colorKey: 'math' },
  // ------------------------------------------------------------------------
  // block-3 — THE READING LESSON, not the book. Changed Aug 10 2026.
  //
  // The parent: "change the time for A long walk to water. I will have him read
  // that book before bed and the reading lessons that you just opened can take
  // the place of the 15 minutes."
  //
  // These fifteen minutes were "Independent Reading" — his novel, with no
  // instruction attached and nothing assessed. The forty Reading & Literature
  // lessons (Bessie Coleman, Mae Jemison, Hidden Figures, main idea, inference,
  // context clues) were built, unreachable, and are the taught half of this
  // subject. They take the slot; the novel moves to bedtime, which is hers to
  // run and not something this schedule tracks.
  //
  // The block is still `colorKey: 'reading'` and still fifteen minutes: nothing
  // before or after it moves.
  // ------------------------------------------------------------------------
  { id: 'block-3', startTime: '10:00', endTime: '10:15', label: 'Reading Lesson', colorKey: 'reading' },
  { id: 'block-4', startTime: '10:15', endTime: '10:30', label: 'Break', colorKey: 'break' },
  // SCIENCE RAN 60 MINUTES UNTIL AUG 9 2026. The parent: "I also wanted to have
  // science to 45 minutes and 15 minutes of typing." The fifteen minutes moves
  // from Science straight into block-5b below — LUNCH STILL STARTS AT 11:30 and
  // nothing after it moves by a minute. Instructional time is unchanged at
  // 5 hr 15 min, because typing is instruction too.
  { id: 'block-5', startTime: '10:30', endTime: '11:15', label: 'Science', colorKey: 'science' },
  // ------------------------------------------------------------------------
  // block-5b — Typing, 15 minutes a day. Added Aug 9 2026.
  //
  // NAMED ON THE PRINTED SCHEDULE ON PURPOSE, for the reason this project has
  // already been caught by once, in the parent's words: "I told him to follow
  // that schedule but that isn't there" — about spelling and vocabulary, which
  // ran a real Mon-Fri cycle the routine never named, so following the schedule
  // genuinely did not tell him to do it.
  //
  // Typing is a skill that only comes from daily reps, and it is the one on
  // this schedule that most rewards short and every-day over long and
  // occasional. Fifteen minutes before lunch is a natural stopping point: the
  // block ends when lunch starts, so there is a hard edge rather than a
  // judgement call about when he has done enough.
  //
  // Runs against EdClub (see data/writing/typingLessons.js) with the built-in
  // lessons and speed test in the app as the backup when the portal is down or
  // he is offline.
  // ------------------------------------------------------------------------
  { id: 'block-5b', startTime: '11:15', endTime: '11:30', label: 'Typing Practice', colorKey: 'reading' },
  { id: 'block-6', startTime: '11:30', endTime: '12:30', label: 'Lunch & Outdoor Time', colorKey: 'break' },
  { id: 'block-7', startTime: '12:30', endTime: '13:30', label: 'Language Arts & Writing Journal', colorKey: 'math' },
  // Added Aug 7, 2026 — the parent: "I told him to follow that schedule but
  // that isn't there." Spelling and vocabulary run a real Mon-Fri cycle
  // (introduce, practice x3, quiz) in lib/weeklyWords.js, but the printed
  // routine never named them, so following the schedule genuinely did not
  // tell him to do it. Carved out of block-7 rather than added on the end, so
  // the school day is not fifteen minutes longer than it was.
  { id: 'block-7b', startTime: '13:30', endTime: '13:45', label: 'Spelling & Vocabulary', colorKey: 'reading' },
  { id: 'block-8', startTime: '13:45', endTime: '14:15', label: 'Physical Education', colorKey: 'pe' },
  // ------------------------------------------------------------------------
  // block-9 — the rotating block. ONE subject, resolved per day.
  //
  // The stored label below is a FALLBACK, not what is displayed. lib/
  // rotatingBlock.js resolves this block against the date on screen and shows
  // the actual course: Aerospace on Mon/Wed, Technology on Tue, Social Studies
  // on Thu, and "Open" on Fri. The stored string is only used when the parent
  // has renamed the block herself, and as the label a printed copy falls back
  // to.
  //
  // IT READ "Aerospace / Social Studies / Coding / Robotics / STEM Project ·
  // Fridays: Gardening or Guitar Theory" UNTIL AUG 9 2026 — five subject names
  // and a Friday clause for a slot that holds exactly one of them. The Friday
  // clause is gone because gardening moved after school (block-11).
  // ------------------------------------------------------------------------
  { id: 'block-9', startTime: '14:15', endTime: '15:00', label: 'Rotating Block — Aerospace / Technology / Social Studies / Robotics', colorKey: 'science' },
  // ------------------------------------------------------------------------
  // block-10 — Electric Guitar practice. Added Aug 8, 2026, with the parent.
  //
  // THIS SITS OUTSIDE SCHOOL HOURS AND IS ON THE PRINTED SCHEDULE ANYWAY, and
  // that is the entire point rather than an oversight. This project has already
  // been caught by exactly the opposite, in her own words: "I told him to
  // follow that schedule but that isn't there" — about spelling and vocabulary,
  // which ran a real Mon-Fri cycle the printed routine never named. Following
  // the schedule genuinely did not tell him to do it, so he did not do it.
  //
  // He is NOT self-disciplined about the guitar, which is the whole reason this
  // subject is being built. An unnamed fifteen minutes will not happen. So it
  // gets what PE has: a named block AND a daily card on his home screen. Both,
  // not either.
  //
  // 3:00 IS CHOSEN DELIBERATELY. Not because the evening is a worse time to
  // play, but because attaching a new habit to a boundary that already fires
  // every single day — the school day ending — is the most reliable way to make
  // it stick. It is parent-movable like every other block.
  //
  // This is the one change that makes the printed day end at 3:15 instead of
  // 3:00. Nothing before it moves by a minute.
  // ------------------------------------------------------------------------
  { id: 'block-10', startTime: '15:00', endTime: '15:15', label: 'Electric Guitar Practice', colorKey: 'reading' },
  // ------------------------------------------------------------------------
  // block-11 — Gardening, AFTER SCHOOL, Fridays. Added Aug 9 2026.
  //
  // The parent: "Gardening can be in the same slot as Lunch 30 min lunch 30
  // min gardening or gardening can be after school." She chose after school.
  //
  // WHY THE LUNCH SPLIT WAS NOT VIABLE, since the question will come back: the
  // 25 garden briefs run 60, 75, 90, 120, 180, 240 and 300 minutes — average
  // 102. The SHORTEST is double a 30-minute slot, and five of them are builds
  // (the trellis, the drip irrigation, the moisture-sensor capstone) that
  // cannot be split without spending most of the time carrying tools in and
  // out. Gardening never fitted an academic slot; that is the real reason
  // Friday had been a buffer day for it.
  //
  // 90 MINUTES covers 20 of the 25 briefs as written. The five long builds
  // want a weekend, which is what they wanted before this change too.
  //
  // FRIDAYS ONLY, and the label says so, because scheduleBlocks is one day
  // template reused Mon-Fri and this block genuinely does not run Mon-Thu.
  // Guitar keeps 3:00-3:15 and still marks the end of the school day.
  // ------------------------------------------------------------------------
  //
  // `days: [5]` is NOT decoration. scheduleBlocks is one template reused Monday
  // through Friday, so without it the class bell announces "Gardening" at 3:20
  // on a Tuesday — a bell ringing for a class nobody is in, which is the exact
  // failure the holiday work fixed a few hours earlier the same day.
  { id: 'block-11', startTime: '15:15', endTime: '16:45', label: 'Gardening — Fridays, after school', colorKey: 'science', days: [5] }
];
