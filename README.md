# LearningOS

A homeschool platform built around what a child wants to become.

**LearningOS contains no learner.** Not a name, not an age, not a subject, not a
lesson. A family creates an Academy at the front door, on their own computer,
and that Academy holds everything about their child.

## The acceptance test

> A fresh checkout, with no imports run, boots to a front door and offers to
> create the first Academy.

That has to be true from the first commit, not achieved later by deleting
things. `scripts/verify-no-learner.mjs` is what holds it.

```bash
npm install
npm run dev            # front door, zero Academies
node scripts/verify-no-learner.mjs
node scripts/verify-academy-db.mjs
node scripts/verify-front-door.mjs
```

## How separation works

Two mechanisms, for two different things.

|  | Where it lives | Isolated by |
|---|---|---|
| **Content** — lessons, theme, guide, subjects | `src/academies/<id>/` | different directories |
| **Records** — XP, attendance, grades, streaks | IndexedDB, in the browser | **different databases** |

The folder is the textbook; the database is the notebook. One database per
Academy means nothing crosses, because there is no shared table for it to cross
through.

`src/db/db.js` is the only file that builds an Academy connection, and
`openAcademy(id, dbName)` is the only way to open one. `src/db/householdDb.js`
holds what belongs to the family rather than to any child — the Academy
registry, the parent's passcode, and which Academy this machine last used.

## Where things are

```
src/
  main.jsx            entry point — renders the gate, nothing else
  FrontDoorGate.jsx   who is at the keyboard, and which database opens
  academies/
    registry.js       naming rules. ACADEMIES is empty and stays empty
  components/
    FrontDoor/        the home page, the sign-in panel, first run
    Academy/          what a signed-in Academy shows
  db/
    db.js             one Academy's records
    householdDb.js    the family's — registry, passcode, session
  lib/
    frontDoor.js      sign-in rules, as plain functions
    parentAuth.js     PBKDF2 hashing, recovery codes
scripts/              guards. Run them; they explain themselves
docs/                 the architecture, the questionnaire, the approved design
```

## Two rules worth knowing before you edit

**The door tells nobody anything.** A wrong name and a wrong PIN fail
identically — same message, same work, same elapsed time. Otherwise anyone who
sits down can type names until the message changes, and the door has published
who lives here. `scripts/verify-front-door.mjs` proves this behaviourally.

**A forgotten passcode is not a lockout.** There is no server and no reset
link. The recovery code shown once at setup is the only way back to a year of
attendance, grades and compliance records. Every screen that asks for the
passcode also offers the recovery code, and using one forces a new passcode and
issues a new recovery code.

## Deploying

Commit and push. Netlify builds from the repository and rebuilds the site
automatically, usually within a minute or two. There is nothing to build by
hand and nothing to upload.

**Point the existing Netlify site at this repository — do not create a new
one.** Browser records belong to the exact web address they were created at. A
new site is a new address, and a new address has an empty database: a learner
would open a school with a year of work missing, even though every byte of it
is still on their computer. Relinking keeps the address, and the records with
it.

## Not here yet

The school itself — dashboard, lesson engine, gradebook, scheduler — arrives
with the first import, together with the interface that binds a component to an
Academy's folder instead of to a hardcoded content path.
