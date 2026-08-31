# LearningOS — C1 build session prompt

**Written Aug 31, 2026, at the end of the session that moved the platform to its
own repository and address. Paste this at the start of the C1 conversation.**

---

## Where things are

| | |
|---|---|
| Platform | `philissa-sketch/learningos`, branch `master` |
| Live at | `https://learningos-academy.netlify.app` |
| Old school | `https://mission-control-homeschool.netlify.app` — untouched archive |
| Checks | 64 scripts, all passing |
| Build | clean, 6.36s |

**Lamar's Academy is live and verified.** `LearningOSDB_lamar-junt`, 1,021 rows,
twelve spot-checks against the export all matching. The 41 ledger rows belonging
to his sister were filtered out at import and stayed behind.

Read `docs/PROJECT_LOG.md` from the entry *"Step A — the platform gets its own
repository"* onward. It is the whole story, including the mistakes.

---

## The job: C1 — an Academy's content is loaded, not compiled in

### The problem, measured

**87 files import `academies/lamar/` directly.** Nothing anywhere selects
content by Academy. Create a second Academy today and the child signs into her
own database and sees Lamar's school: his subjects, his guide, his timetable.

Records separate correctly. Curriculum does not exist.

```
grep -rl "academies/lamar/" src --include=*.js --include=*.jsx | wc -l   # 87
```

`scripts/generic-debt.json` lists **131 school-zone files** that name one
Academy (a superset — it includes subject strings and guide names, not just
imports). `verify-no-learner.mjs` treats it as a ratchet: the list may shrink and
must never grow.

### It also fixes the bundle

`dist/assets/index-*.js` is **4,866.94 kB**. Static imports cannot be
code-split, so every learner downloads every curriculum. A dynamic import per
Academy fixes separation of bytes and separation of concerns in one move — that
is what putting content in `academies/<id>/` was for.

### The shape of the work

Three zones, from `verify-no-learner.mjs`:

- **platform** (13 files) — already clean, must stay clean
- **academy** (`academies/lamar/`, 78 files) — content, exempt by definition
- **school** (197 files: `components/ lib/ store/ engine/ App.jsx`) — the job

Most of the 131 need only an import-path change once a mechanism exists. A
handful need real thought:

- `store/useAppStore.js` — 22 content imports in one file
- `App.jsx` — imports `academies/lamar/academy.css` by name
- `lib/novaVoice.js` — `STUDENT_NAME` and the guide's whole line pool
- `lib/scheduledMinutes.js`, `lib/pacing.js`, `engine/problemTemplates.js` —
  subject ids as keys

### The constraint that shaped the last attempt

Content and bones are welded in **207 import statements across 87 files**, and
some content files import back into `lib/` (`scheduler.js`, `schoolQuarter.js`).
Any rewrite must resolve specifiers rather than string-replace `../data/` —
the number of `../` segments depends on file depth, and getting it wrong fails
at runtime, not at build. The last pass did it by resolving each import against
the old tree, mapping through a move table, and re-expressing it relative to the
new location: 211 specifiers, zero unresolved.

---

## Then C2 — Azianna

Only after C1. Her spec work is already done; do not redo it.

`LEARNINGOS_PACK_SPEC.md` §8 has the field-by-field diff. The two known items:

- **`practiceGeneratorId`** — every one of his 261 beats has one and
  `LessonEngine` builds the practice phase from `getTemplateById(...).build()`.
  Hers has no generator system; her practice is a static bank. **Decision:
  teach LessonEngine a bank-backed path** (~1 day) rather than write 512
  generator templates. It improves his engine either way.
- **`activity` and `ledger`** — 243 of her lessons carry a hands-on activity and
  a written record. His schema has no home for them. **Decision: carry them over
  anyway.** Add the fields even though nothing renders them yet.

Also authoring, not scripting: **256 `connection` paragraphs** and **128 missing
`explanation` strings**. No script writes those.

Her placement is nine strand levels in
`petal-pestle-academy/claude/azianna-diagnostic-results.md`, re-entered by hand.

**Her video data is richer than his** (`id`, `title`, `channel`, `minutes`,
`verified`, `teaches`, `sourceGap` vs. his bare URL string). His schema should
take hers, not the reverse.

---

## Rules that outlive the step

- **The platform contains no learner.** `verify-no-learner.mjs` enforces it by
  zone. Do not weaken the zones to make a change pass.
- **The debt list may shrink and must never grow.**
- **Copy, never mutate.** Nothing has ever written to the original records, and
  that is why every wrong turn this month was recoverable.
- **Code is not live until it is pushed.** Three separate stalls this session
  came from a change that existed locally and nowhere else. Verify the DEPLOYED
  bundle for a known string, not the local file.

## Settled — do not undo

- **A learner can sign themselves out.** It was behind the parent passcode; that
  made the second child on a shared computer wait for her mother every morning.
  The guard now asserts the opposite of what it used to, with the old reasoning
  kept above it.
- The 3-group tab structure, quiet tiles as a dead pattern, derived card order,
  PE pinned above the day-kind branch — all parent-negotiated, all still true.
- Single-profile in the old `PROJECT_PLAN.md` is reversed on purpose.

## Cut list

- The Tailwind token rename — 5,614 occurrences, zero visible effect
- Migrating Azianna's records — she starts fresh; Petal & Pestle stays read-only
- Supabase — worth a real conversation, but not during C1
- Hand-auditing the subject literals — the debt list is the audit, generated

---

## Open, unrelated to C1

- **The second computer is done.** Both machines are on the new address, each
  with its own household database and Academy record.

- **Attendance is resolved — nothing was wrong.** 36 rows against 21 possible
  weekdays broke down as 21 weekdays + 7 weekend days with real work + 8 summer
  days before Aug 3. Every row carried real minutes; there were no test rows and
  nothing was deleted. Both extra categories legitimately count under the
  standing summer and weekend rules.

- **Two days show implausible lesson counts** — one Sunday with 50 lessons in 16
  minutes, the Monday after with 91 in 113. Every other day is 0–19. Looks like a
  bulk mark-complete (a Khan seed or a batch tick). It inflates the gradebook and
  lesson counts, not the hours, so it is a records question rather than a
  compliance one. Left alone deliberately.

- **Only 7 of 36 days show 270+ active minutes** (Georgia's 4.5-hour bar). But
  `activeMinutes` is app-active time and the dashboard credits
  `max(active, scheduled)`, so the reported figure is higher. Worth comparing the
  two once, to know which number would be stood behind.
