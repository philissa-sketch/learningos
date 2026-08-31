# LearningOS — creating a new Academy

**Aug 30, 2026 · rev 2.** The questions that fill in a blank Academy.
Companion to `LEARNINGOS_PACK_SPEC.md`.

**LearningOS is the platform. Each learner has an Academy** — *Mission Control
Academy*, *Petal & Pestle Academy*. An Academy ships blank and these questions fill it
in.

Every question below writes a real field in `src/academies/<id>/`. If a question
doesn't write a field, it isn't in here.

**Total time: about 25 minutes across two sittings, plus diagnostics done separately.**

---

## The rule this is built on

> **Nothing about a child's level is asked. It is measured.**

Age, grade and reading level are three different numbers. Azianna is 9, in 4th grade,
and reads at 2.5 — and that gap was found by diagnostic, not assumption. A
questionnaire that asks "what grade are they in?" and uses the answer to place them
would have put her two years above where she actually reads.

Grade and age are collected for **records and content-appropriateness only.** They
never touch placement.

---

## Section A · The learner
*Parent answers · 4 minutes*

| # | Question | Writes | Notes |
|---|---|---|---|
| A1 | First name | `profile.displayName` | Used everywhere the app talks to them |
| A2 | Date of birth | `profile.dob` | Content appropriateness. **Not placement** |
| A3 | Grade level for the record | `profile.gradeLevel` | Compliance and transcripts. **Not placement** |
| A4 | What do they want to be when they grow up? | `profile.careerTrack` | Drives the signature subject, rank names, guide concept |
| A5 | What should their Academy be called? | `profile.academyName` | *Mission Control Academy · Petal & Pestle Academy.* Let the child name it |
| A6 | Which state do you homeschool in? | `household.state` | Drives everything in §G. Set once per family |

---

## Section B · How they actually learn
*Parent answers · 6 minutes · answer honestly, not aspirationally*

| # | Question | Writes |
|---|---|---|
| B1 | How many days a week is school? | `timetable.schoolDays` |
| B2 | How many hours a day? | `timetable.dailyMinutes` — Georgia expects 4.5 hrs × 180 days |
| B3 | What time does the day start? | `timetable.startTime` |
| B4 | When is their brain sharpest — morning, midday, afternoon? | Block ordering: hard subjects land there |
| B5 | How long can they focus in one sitting before it stops working? | `timetable.lessonMinutes` — 20 / 30 / 45 |
| B6 | Do they read instructions themselves, or do they need them read aloud? | `profile.readAloudDefault` |
| B7 | Anything that changes how content must be written? | `profile.contentFences` |

**B6 is the most important question in this document.** 63% of Azianna's diagnostic
answers were read aloud — 83% of reading comprehension, 33% of maths. That single
fact means every ELA level in her record is a *listening* level, and her independent
reading has still never been measured. If the app doesn't know this from day one, it
will report a number that isn't true.

**B7 examples, from real decisions already made:** no weight or appearance language
(the reason Physical Education became *Movement & Wellbeing* in Azianna's app); low
sensory load; dyslexia-friendly type; no photorealistic medical imagery. These become
enforced rules in the check scripts, not just preferences.

---

## Section C · Their world
*Child answers, parent alongside · 8 minutes · this is the fun part*

| # | Question | Writes |
|---|---|---|
| C1 | Pick your colors | `theme.vars` — writes the CSS variables |
| C2 | Bright or dark? | `theme.mode` |
| C3 | Who's your guide? What's their name? | `guide.name` |
| C4 | What are they — a commander, a doctor, a scientist, a gardener? | `guide.role` |
| C5 | What should your guide call you? | `guide.honorific` — *cadet · apprentice · captain* |
| C6 | Should your guide be serious, funny, or gentle? | `guide.tone` — picks the line pool |
| C6b | Should your guide talk to you like a little kid, someone in the middle, or someone older? | `guide.register` — *early · middle · older*. **Defaults from age; this question only confirms or overrides it.** Register is how the guide *talks*, never what gets taught — see the note below |
| C7 | What's one real thing you're working toward? | `economy.dreamGoal` — anchors the reward ladder |

Let the child answer these out loud and type it for them. Whether they own the guide's
name is the difference between a character and a mascot.

**On C6b — the one place age is the right input.** Nobody is ever *placed* by age;
that rule is the foundation of this whole document. But how a guide *talks* to someone
is exactly what age is for. A 7-year-old and a 16-year-old can read at the same level
and still need different lines — *"Nice work! You got it!"* is warm to one and
patronizing to the other. Register changes the guide's voice and **never** touches
placement, pacing, or what gets taught.

---

## Section D · Subjects
*Parent answers, mostly pre-filled · 4 minutes*

| # | Question | Writes |
|---|---|---|
| D1 | Confirm your state's required subjects | `subjects.active` — pre-filled from §G |
| D2 | Signature subject | `subjects.signature` — suggested from A4 |
| D3 | Which subjects run all year vs. rotate by quarter? | `subjects.rotating` |
| D4 | Which are taught by Khan Academy? | `subjects.khanTaught` — defaults to math, reading, science |
| D5 | Hands-on subjects — garden, instrument, sport, animals? | `subjects.participation` |
| D6 | Anything they're already doing outside that should count? | `subjects.participation` + hours ledger |

D6 catches real hours that usually go unrecorded — co-op, lessons, 4-H, church
teaching, a job. Georgia counts them; most families forget to.

---

## Section E · Placement
*Not asked. Measured. · done separately, results entered after*

| Subject | Instrument | Free? |
|---|---|---|
| Reading | ReadTheory | Yes, confirmed |
| Math | Khan Academy Course Challenge | Yes |
| Science | CK-12 | Yes |
| Everything else | First two weeks of work | — |

The parent runs these outside the app and enters the results. Then:

| # | Field | Writes |
|---|---|---|
| E1 | Level per strand | `placement.strandLevels` |
| E2 | Date measured | `placement.capturedOn` |
| E3 | Which instrument produced it | `placement.instrument` |
| E4 | **Was it read aloud?** | `placement.readAloud` — per strand |

**E4 exists because a level reached by listening is not the same claim as a level
reached by reading.** Record which one it was, or the number lies later.

A subject's starting block is set by its **lowest** strand, never its average.
Azianna's reading block opens on Vocabulary at 2.91, not Reading Comprehension at
3.46 — because the weaker strand is the one that will stall her.

---

## Section F · Rewards
*Parent answers · 3 minutes*

| # | Question | Writes |
|---|---|---|
| F1 | **Does being right earn currency, or does effort?** | `economy.paysForCorrect` |
| F2 | What are the currencies called? | `economy.currencies` — *Coins/Credits · Petals/Golden Seeds* |
| F3 | What's the rank ladder called? | `economy.rankNames` — suggested from the career |
| F4 | Who approves real-world rewards, and above what amount? | `economy.parentApprovalThreshold` |

**F1 is the one genuine fork between the two existing apps.** Lamar's pays XP for
correct answers. Azianna's deliberately pays nothing for being right — so that her
adaptive diagnostic can't be gamed by a child who wants petals. Both are defensible.
The app should ask rather than assume, and record the reason.

---

## Section G · State compliance
*Answered by A6 · nothing else to type*

Picking a state pulls in that state's rules and writes them into the household record.
**Any state, not just Georgia.**

| What it sets | Effect |
|---|---|
| Days per year, hours per day | Attendance targets and the hours ledger |
| Notification requirement and deadline | Reminders — Georgia's Declaration of Intent by Sept 1 |
| Required subjects | Pre-fills D1 |
| Assessment cadence | Whether standardized test records are needed, and when |
| Record-keeping duties | Which compliance checks appear |
| Annual report format | What the Record view produces |

**The rule, same as videos:** verified against a primary source, never invented.

- `sourceUrl` and `verifiedOn` are required — a state without them does not load
- **An unverified state says so.** It gives generic record-keeping and an honest
  message. It never guesses a rule
- `verifiedOn` older than 12 months raises a warning — homeschool law changes
- States are added as families need them, not written out in advance

This is legal compliance. A confidently wrong entry is worse than a blank one.

---

## What is deliberately NOT asked

| Not asked | Why |
|---|---|
| Reading level | Measured (§E). Asking invites a guess that becomes a fact |
| Grade level *for placement* | Same. Collected in A3 for records only |
| A four-year plan | Nobody knows. The app builds a year and re-plans each quarter |
| Full scope and sequence | That's the curriculum's job, not the parent's |
| Learning style (visual/auditory/kinesthetic) | Not supported by evidence; would drive real decisions off a bad signal |
| Diagnoses or medical history | B7 captures what changes the content. Nothing more is needed |
| Anything that has a safe default | Ask on day 200, not day 1. Every extra question is a family that doesn't finish setup |

---

## What the app does with it

**Immediately, same day:**

1. Creates `src/academies/<id>/` from `_template/`
2. Opens `MissionControlHomeschoolDB_<id>` — their own database
3. Writes theme, guide, subjects, timetable, profile
4. Maps Khan units to their real strand levels
5. Builds a first-quarter plan against the household calendar
6. **They sign in and land in their room**

**Over the following weeks:** the career-track lessons get authored — days of writing,
plus video verification, which is the real constraint.

---

## None of this is permanent

Every answer above can be changed later, and the platform is built for it — see
`LEARNINGOS_PACK_SPEC.md` §3a.

A child who says "aerospace engineer" at 12 may say "marine biologist" at 14. That's
the normal case. **Changing the answer changes the upcoming lessons. It never touches
what they've already earned** — finished work, XP, rank, hours, grades, portfolio and
transcript all stay.

The grown-up corner has a **"Change what you're working toward"** screen. It's this
same questionnaire, opened again.

---

## After setup — the first review

Set a reminder for **two weeks in.** Three questions, and they're the ones that catch
a bad setup before it becomes a bad year:

1. Is the daily load right, or are they finishing in half the time / not finishing?
2. Did the placement hold, or is something obviously too easy or too hard?
3. Is B6 still true — are they reading it themselves, or still being read to?

Everything in Sections B and E is meant to be revised. Nothing here is a commitment.
