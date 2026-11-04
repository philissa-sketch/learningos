// ---------------------------------------------------------------------------
// Default recommended daily homeschool schedule. Parents can fully
// customize this (edit times/labels, add/remove/reorder blocks) — this is
// only the starting point new users see and the target of "Reset to
// Recommended Schedule".
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// MORNING RETIME, Aug 9 2026 — with the parent, in her words: "the time for
// reading should be less than 45min and language arts and writing should be
// longer. 15 minutes for reading and I will have him read later in the day
// before bed."
//
// Reading is NOT reduced overall — it moves. Fifteen minutes here, and the
// real reading happens at bedtime, which is the parent's own arrangement and
// not something this file tracks.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// FULL TIMETABLE REBUILD, Nov 3 2026 — every block below carries the exact
// minutes the parent stated, subject by subject, after the Science/Social
// Studies collision ("why are all these subjects in the same time slot?")
// turned out to be one case of a pattern repeated three more times on this
// same printed day: Language Arts, Daily Writing AND Writing Journal all
// sharing one 12:45 stamp inside the old block-7, and Spelling AND
// Vocabulary both sharing one 1:30 stamp inside the old block-7b. Three
// different activities can share a hallway; they cannot share a clock.
//
// Her list, verbatim, is the spec this file now matches exactly:
//   Math 30, Reading 15, Social Studies 30, Science 30, Typing 15,
//   Language Arts 30, Daily Writing 15, Writing Journal 15, Spelling 15,
//   Vocab 15, PE 30, Tech 30, Guitar 15, Garden 15, Aerospace 30.
//
// WHAT THIS CHANGES FROM THE NOV 3 "Social Studies every day" REBUILD JUST
// BEFORE IT: Math 60 -> 30, Science 45 -> 30, the rotating block
// (Aerospace/Technology/Robotics) 45 -> 30, and block-7 / block-7b each
// split into their real, separately-timed pieces instead of staying one
// slot wearing two or three names. Social Studies (block-5c, added minutes
// earlier that same day) is untouched by this pass — it was already a real
// 30-minute daily block and her list confirms the number, not a change.
//
// EVERY OTHER BLOCK a parent has not asked to change keeps its own duration:
// Morning Meeting (30), Lunch & Outdoor Time (60), PE (30), Guitar (15), and
// the two garden blocks. Nothing here is touched that she did not name.
//
// THE DAY GETS SHORTER, NOT LONGER. Math and Science each gave back minutes
// nobody asked them to keep, and the rotating block gave back fifteen more —
// net sixty minutes off a day that, the same morning, had just gained thirty
// for Social Studies. The school day now runs 8:30 to 3:00 Monday-Thursday
// (3:00-4:30 after school is the Mon-Thu Garden Check and, Fridays, the full
// 90-minute Gardening session) instead of 8:30 to 3:30/3:45. Instructional
// time — every block except Lunch — is 5 hr 30 min, still well clear of
// Georgia's 4.5 hr/day average.
//
// See migrateSavedSchedule() in useAppStore.js for the one-time shift
// applied to schedules a parent has already customized and saved.
// ---------------------------------------------------------------------------

export const defaultSchedule = [
  { id: 'block-1', startTime: '08:30', endTime: '09:00', label: 'Morning Meeting, Goals & Calendar', colorKey: 'neutral' },
  { id: 'block-2', startTime: '09:00', endTime: '09:30', label: 'Mathematics', colorKey: 'math' },
  // ------------------------------------------------------------------------
  // block-3 — THE READING LESSON, not the book. Still fifteen minutes,
  // still `colorKey: 'reading'` — see MORNING RETIME above for why it is
  // short on purpose, and the Aug 10 2026 history (kept in git) for why it
  // is a taught lesson rather than independent reading time.
  // ------------------------------------------------------------------------
  { id: 'block-3', startTime: '09:30', endTime: '09:45', label: 'Reading Lesson', colorKey: 'reading' },
  // ------------------------------------------------------------------------
  // block-5c — Social Studies, every school day. Added Nov 3 2026, the same
  // day as this file's full rebuild (see the top-of-file comment), after
  // three different borrow-a-slot mechanisms for this one subject collided
  // on screen. No `days` restriction — same as Math and Science.
  // ------------------------------------------------------------------------
  { id: 'block-5c', startTime: '09:45', endTime: '10:15', label: 'Social Studies', colorKey: 'science' },
  { id: 'block-5', startTime: '10:15', endTime: '10:45', label: 'Science', colorKey: 'science' },
  // ------------------------------------------------------------------------
  // block-5b — Typing, 15 minutes a day. Runs against EdClub (see
  // data/writing/typingLessons.js) with the built-in lessons and speed test
  // in the app as the backup when the portal is down or he is offline.
  // ------------------------------------------------------------------------
  { id: 'block-5b', startTime: '10:45', endTime: '11:00', label: 'Typing Practice', colorKey: 'reading' },
  { id: 'block-6', startTime: '11:00', endTime: '12:00', label: 'Lunch & Outdoor Time', colorKey: 'break' },
  // ------------------------------------------------------------------------
  // block-7 / block-7a / block-7d — ENGLISH IS THREE BLOCKS, NOT ONE.
  // Split Nov 3 2026. Until this change all three lived in a single 60-
  // minute "Language Arts & Writing Journal" slot and all printed the same
  // 12:45 clock time — Khan Academy Language Arts, the daily structure
  // drill, and the graded Writing Journal prompt, three different pieces of
  // work stamped with one time. That is the exact shape of bug the Science/
  // Social Studies collision was, just one slot over. Each now has its own
  // real, sequential block and its own key in BLOCK_FOR_SUBJECT
  // (scheduledMinutes.js): `ela` (block-7), `dailyWriting` (block-7a),
  // `writingJournal` (block-7d).
  // ------------------------------------------------------------------------
  { id: 'block-7', startTime: '12:00', endTime: '12:30', label: 'Language Arts', colorKey: 'math' },
  { id: 'block-7a', startTime: '12:30', endTime: '12:45', label: 'Daily Writing', colorKey: 'reading' },
  { id: 'block-7d', startTime: '12:45', endTime: '13:00', label: 'Writing Journal', colorKey: 'reading' },
  // ------------------------------------------------------------------------
  // block-7b / block-7c — SPELLING IS NOT VOCABULARY. Split Nov 3 2026, same
  // reason as block-7 above: both skills were stamped with the same 1:30
  // clock time inside one "Spelling & Vocabulary" block, and Mission Control
  // has shown a real row for each of them every school day since Aug 9 2026
  // (see lib/weeklyWords.js). Each now has its own 15-minute block and its
  // own BLOCK_FOR_SUBJECT key: `spelling` (block-7b, keeps its original id),
  // `vocabulary` (block-7c, new).
  // ------------------------------------------------------------------------
  { id: 'block-7b', startTime: '13:00', endTime: '13:15', label: 'Spelling', colorKey: 'reading' },
  { id: 'block-7c', startTime: '13:15', endTime: '13:30', label: 'Vocabulary', colorKey: 'reading' },
  { id: 'block-8', startTime: '13:30', endTime: '14:00', label: 'Physical Education', colorKey: 'pe' },
  // ------------------------------------------------------------------------
  // block-9 / block-9b / block-9c — AEROSPACE, TECHNOLOGY AND ROBOTICS ARE
  // EACH DAILY NOW. De-rotated Nov 3 2026, same day as the rebuild above,
  // on the parent's own words: "i don't want aerospace robotics and tech to
  // be rotating... I want them to be daily. social studies should be daily
  // as well." (Social Studies had already gone daily, as block-5c, earlier
  // that same day.)
  //
  // Until this change these three subjects shared ONE 30-minute slot
  // (block-9), resolved per day by lib/rotatingBlock.js so that only one of
  // them ever ran on a given day — the exact "three different activities,
  // one clock" shape the rest of this file's rebuild fixed everywhere else.
  // Each now gets its own real, sequential 30-minute block every school
  // day, with its own fixed id in BLOCK_FOR_SUBJECT (scheduledMinutes.js):
  // `aerospace` (block-9, keeps its original id), `technology` (block-9b,
  // new), `robotics` (block-9c, new). lib/rotatingBlock.js's day-resolution
  // machinery (liveRotatingSubjects, the dynamic block-9 label) is retired
  // the same way the morning-slot machinery was retired for Social Studies
  // — kept in the file as dormant code, not deleted.
  //
  // THE DAY GOT 60 MINUTES LONGER as a direct result: three real 30-minute
  // blocks instead of one shared one. Guitar, the Garden Check and Friday's
  // Gardening session all shift an hour later to make room; none of their
  // own durations changed.
  // ------------------------------------------------------------------------
  { id: 'block-9', startTime: '14:00', endTime: '14:30', label: 'Aerospace Engineering', colorKey: 'science' },
  { id: 'block-9b', startTime: '14:30', endTime: '15:00', label: 'Technology & Computer Science', colorKey: 'science' },
  { id: 'block-9c', startTime: '15:00', endTime: '15:30', label: 'Robotics & Automation', colorKey: 'science' },
  // ------------------------------------------------------------------------
  // block-10 — Electric Guitar practice. Named on the printed schedule AND
  // a daily card on his home screen, on purpose — see the Aug 8 2026
  // history (kept in git) for why an unnamed block does not get done.
  // Shifted an hour later Nov 3 2026 (was 14:30) when Aerospace/Technology/
  // Robotics each became its own real block instead of sharing one.
  // ------------------------------------------------------------------------
  { id: 'block-10', startTime: '15:30', endTime: '15:45', label: 'Electric Guitar Practice', colorKey: 'reading' },
  // ------------------------------------------------------------------------
  // block-11 — Gardening, AFTER SCHOOL, Fridays. 90 minutes, unchanged by
  // this rebuild — her list did not name gardening's Friday session, only
  // the daily 15-minute check below. `days: [5]` is NOT decoration: this
  // file is one template reused Monday-Friday, so without it the class bell
  // announces "Gardening" on a day nobody is in that class. Shifted an hour
  // later Nov 3 2026, same reason as block-10.
  // ------------------------------------------------------------------------
  { id: 'block-11', startTime: '15:45', endTime: '17:15', label: 'Gardening — Fridays, after school', colorKey: 'science', days: [5] },
  // ------------------------------------------------------------------------
  // block-11b — Garden Check (water & look), Mon-Thu, after school. 15
  // minutes, matching her list. `days: [1, 2, 3, 4]` on purpose — Friday
  // already has its own block-11 and does not need a second, smaller one
  // layered under it. Shifted an hour later Nov 3 2026, same reason as
  // block-10.
  // ------------------------------------------------------------------------
  { id: 'block-11b', startTime: '15:45', endTime: '16:00', label: 'Garden Check — water & look', colorKey: 'science', days: [1, 2, 3, 4] }
];
