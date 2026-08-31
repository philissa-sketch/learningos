# Moving the school to its own web address

**The two addresses in this document:**

| | |
|---|---|
| **OLD address** | `https://mission-control-homeschool.netlify.app` |
| **NEW address** | `https://learningos-academy.netlify.app` |

"Address" means the website URL — the thing in the bar at the top of the
browser. The OLD address is the site Lamar opens every morning. The NEW one
does not exist yet; you create it in Part B.

---

## Why this is not just changing a link

Browsers lock saved work to the **exact** website address that created it. Not
the app, not the code — the address text itself.

So `mission-control-homeschool.netlify.app` and `learningos-academy.netlify.app`
cannot see each other's records. Same computer, same browser, same person — it
does not matter. The records have to be carried across in a file.

**A second thing that surprises people:** the records also live on the
*computer*, not on the website. Your computer has your copy. Lamar's computer
has his. They are separate, which is why you trade files every day.

**That means this whole process gets done twice — once per computer.**

---

# PART A · Get today's work onto one computer first

Do this before anything else, or the file you carry across will be missing
whatever Lamar has done since his last send.

1. **On Lamar's computer**, open `https://mission-control-homeschool.netlify.app`
2. Go to the **Morning Meeting** screen
3. Click **"Send my work to Mom"** — a file downloads
4. Get that file to your computer however you normally do
5. **On your computer**, open the same address, go to Morning Meeting, and load
   his file the way you normally do

Now your computer has everything: his work, and your records. That is the copy
worth carrying.

---

# PART B · Create the new website

1. Go to **netlify.com** and sign in
2. Click **Add new project** → **Import an existing project**
3. Choose **GitHub**, then pick the repository **`learningos`**
4. Check the build settings — they should already say:
   - Branch: `master`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy**
6. When it finishes, Netlify gives the site a random name like
   `sparkly-otter-1a2b3c`. Change it:
   **Project configuration → Change site name** → type `learningos-academy`

You should now be able to open `https://learningos-academy.netlify.app` and see
the LearningOS home page.

**Do not do anything else there yet.** Just check it loads.

---

# PART C · Export from the OLD address

Do this **on your computer**, in the browser you normally use.

### C1 · Open the snippet file

The file is at:

```
C:\Users\pknot\Downloads\learningos\docs\migration-export-snippet.js
```

Right-click it → **Open with** → **Notepad**.

Click once inside the text, then press **Ctrl + A** (selects everything), then
**Ctrl + C** (copies it).

### C2 · Open the old website

In your browser, go to:

```
https://mission-control-homeschool.netlify.app
```

Wait for it to finish loading.

### C3 · Open the console

Press **Ctrl + Shift + J**.

That opens the developer panel *and* lands on the Console tab, which is the one
you want. A `>` prompt with a blinking cursor appears.

> **Do not use F12 on this laptop.** On HP machines the top row is set to
> hardware actions by default, and F12 opens the Calculator. If you ever want
> the real F12, hold **Fn** and press it — but Ctrl + Shift + J is fewer keys
> and goes straight to the right tab.

**If Ctrl + Shift + J does nothing**, use the menu instead: click the **⋮**
three dots at the top-right of Chrome → **More tools** → **Developer tools** →
then click the **Console** tab along the top of the panel that opens.

> **If it says "Doing something dangerous?" or asks you to type `allow pasting`,**
> type `allow pasting` and press Enter. Chrome asks this the first time. It is
> protecting you from strangers who tell people to paste things. In this case you
> know what the code is — it is in your own repository and you can read it.

### C4 · Paste and run

Click the `>` prompt, press **Ctrl + V**, then press **Enter**.

It will take a few seconds. Then:

- a file downloads — `learningos-migration-2026-08-31.json`
- the console prints a **table of row counts**

### C5 · Look at the table before moving on

Read the numbers. They should look like a school year:

| Table | Roughly |
|---|---|
| `attendance` | one row per school day so far |
| `lessonProgress` | hundreds |
| `ledger` | dozens |
| `complianceChecks` | a handful |

**A number that looks far too small means you are in the wrong browser or a
private window.** Nothing is broken — close it, open your normal browser, and
start again at C2.

The file lands in your **Downloads** folder.

---

# PART D · Import at the NEW address

Still on your computer.

1. Go to `https://learningos-academy.netlify.app`
2. Click **Create an Academy**
3. Set your parent passcode
4. **Write the recovery code down.** It is shown once. There is no server
   anywhere that can reset a forgotten passcode — this code is the only way back
   in, and the records behind it are your compliance file. Put it with your
   homeschool records.
5. Enter the name Lamar will type, and four numbers for him
6. You land on a screen saying the Academy is empty. Click
   **Import an existing school**
7. Click the **From a file** tab
8. Choose the `learningos-migration-….json` file from Downloads

### What you should see next

- **Currencies found** — tick **coin** and **credit** only.
  Leave **petal** and **seed** unticked; those 41 rows belong to Azianna and
  ended up in his ledger by accident back in August.
- **In this file, and not in a daily handoff** — a list including
  `complianceChecks`, `adminRecords`, `courseDescriptions`. Seeing that list is
  the point: it is proof your own records travelled, not just his schoolwork.
- **Tables** — leave everything ticked.

Click **Copy into this Academy**. It writes, then reads it all back and checks
it matches.

---

# PART E · Check before trusting it

At the new address, in the Parent Dashboard, look at:

- **Attendance** — does the day count match?
- **Gradebook** — is a recent grade there?
- **Compliance** — are your checkmarks there?
- **Course descriptions** — is your writing there?

Then **sign out and sign back in** as Lamar, and check his dashboard looks
normal.

**Only if all of that is right, continue.** The old address still works and
still has everything. There is no deadline.

---

# PART F · The second computer

The child's computer does **not** need the old address, and does not need the
console. You already have the complete, verified record on your machine — carry
that across instead of exporting from the old app a second time.

### F1 · On YOUR computer, at the NEW address

Run the migration export snippet again (Part C, steps C1–C4). This time it reads
the **new** Academy, so the file you get is the current record, already filtered,
already verified.

### F2 · On THEIR computer

1. Go to `https://learningos-academy.netlify.app`
2. Create the Academy — their name, their four numbers
3. **Import an existing school → From a file** → pick the file from F1
4. Leave everything ticked. There is nothing to filter this time; the sibling's
   rows were left behind in the first import and are not in this file.

### F3 · Change the bookmark

Point it at the new address. The old one can stay in place as an archive — it
still holds everything as it was, and nothing you do at the new address touches
it.

### A note on Academy ids

Each computer generates its own id when the Academy is created, so the same
child will be `lamar-junt` on one machine and something else on the other.

**This does not matter.** The daily handoff carries rows and their syncIds, never
academy ids, and nothing else in the app references them. Two ids for one child
is untidy to look at and has no effect on anything.

## The daily routine after this

Unchanged. Two computers still keep separate records, so the morning load and
end-of-day send continue exactly as before — just at the new address.

---

## If something goes wrong

| What you see | What it means |
|---|---|
| "No databases at this address" | Wrong URL, or a private/incognito window |
| "That is not a migration file" | You picked the daily "send my work" file. Use the one from Part C |
| "The file does not match its own manifest" | The download was cut short. Run Part C again |
| Row counts far too low | Wrong browser, or a private window — records are per browser |
| The new site shows the old app | Netlify built the wrong repository. Check Part B step 3 |

**Nothing in this process ever writes to the old records.** The snippet only
reads. If any step goes wrong, the answer is always to start that step again.
