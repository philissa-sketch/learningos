// ---------------------------------------------------------------------------
// The single source of truth. Every screen reads from here; nothing reads the
// database directly. Same shape as Mission Control's store, a great deal
// smaller, because this app does one thing.
//
// THE ONE RULE WORTH STATING: the store never invents a level. It calls
// applyAnswer() in engine/diagnosticEngine.js and stores what comes back. If
// the adaptive rules ever need to change, they change in one file and this one
// does not move.
// ---------------------------------------------------------------------------

import { create } from 'zustand';
import { khanGradeRow } from '../lib/khanGrade.js';
import {
  db,
  readMeta,
  writeMeta,
  readAllStrandStates,
  writeStrandState,
  appendAnswer,
  readAnswers,
  startSitting,
  endSitting,
  readSittings,
  readLedger,
  appendLedgerEntry,
  readRequests,
  putRequest,
  readJournal,
  putJournalEntry,
  deleteJournalEntry,
  readMessages,
  putMessage,
  deleteMessage,
  readScheduleDays,
  putScheduleDay,
  readLessonReads,
  readProjects,
  readKhanGrades,
  putKhanGrade,
  deleteKhanGrade,
  readWritingMarks,
  putWritingMark,
  deleteWritingMark,
  putProject,
  putLessonRead,
  readAttempts,
  putAttempt,
  readReviewItems,
  putReviewItems,
  resetEverything,
  appendItemEvents,
  readItemEvents,
  readBaselines,
  captureBaselineOnce,
  readGoals,
  readJournalMarks,
  putJournalMark,
  readWritingDrafts,
  putWritingDraft,
  loadSpellingResults,
  putSpellingResult,
  clearJournalMark,
  putGoal
} from '../db/db.js';
import {
  dayKeyOf,
  newReviewItem,
  applyReviewAnswer,
  pickWarmUp,
  pickLessonRetrieve,
  dueItems
} from '../lib/reviewQueue.js';
import { WARM_UP, LESSON_RETRIEVE, PETALS, SEEDS } from '../config/assessment.js';
import { warmUpSize } from '../lib/morningCircle.js';
import { SETUP_SLOT, researchSlot, canTickResearch, bookReportSlot } from '../lib/academicCenter.js';
import { isEvidenceSource, isAttemptState } from '../config/evidence.js';
import { proposeGrowthGoals, goalProgress, MIN_ASKED_FOR_A_GOAL } from '../lib/goals.js';
import { SCHOOL_YEAR, END_OF_SUMMER } from '../config/calendar.js';
import { catchUpList } from '../lib/catchUp.js';
import { itemsForLessons } from '../data/assessments/appBank.js'; // v3.25 — every course
import { lessonById, courseOfLesson } from '../data/lessons/appCourses.js';
import {
  makeEntry,
  balanceFor,
  earnedFromEffort,
  earningBreakdown,
  seedPurchaseApproval,
  reservedSeeds,
  seedMatchFor,
  newEntryId,
  legacyTopUp,
  DIAGNOSTIC_COMPLETE_BONUS
} from '../lib/economy.js';
import { getPetalItem } from '../data/rewards/petalCatalog.js';
import { rewardRequiresGrownUp } from '../data/rewards/seedRewards.js';
import { STRAND_IDS, STRANDS } from '../config/strands.js';
import {
  initialStrandState,
  reopenStrandState,
  isPinnedAtFloor,
  reDiagnosticDue,
  applyAnswer,
  pickNextStrand,
  chooseItem,
  diagnosticProgress,
  SITTING_LENGTH
} from '../engine/diagnosticEngine.js';
import { itemsForStrand } from '../data/diagnostic/index.js';
import { HUMANBODY_MODULES } from '../data/lessons/humanbodyCourse.js';
import { getCurrentRank } from '../lib/ranks.js';
import { DEFAULT_SCHEDULE } from '../config/schedule.js';
import { wordCount } from '../data/journal/journalPrompts.js';
import { WRITING_FINAL_STEP } from '../data/writing/writingPieces.js';

function todayKey(now = new Date()) {
  // Local date, not UTC. A 7pm session in Georgia must not count as tomorrow.
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysBetween(aKey, bKey) {
  const a = new Date(`${aKey}T00:00:00`);
  const b = new Date(`${bKey}T00:00:00`);
  return Math.round((b - a) / 86400000);
}

export const useAppStore = create((set, get) => ({
  hydrated: false,
  hydrationError: null,

  learnerName: '',
  strands: {},
  answers: [],
  sittings: [],
  itemEvents: [],
  baselines: {},
  goals: [],
  journalMarks: {},
  // v11 — her book report drafts, keyed by slot. Her own words.
  writingDrafts: {},
  // Append-only, like `attempts`. A sat spelling test is a historical event.
  spellingResults: [],
  streak: 0,
  lastActiveDay: null,
  parentPasscode: null,

  // ---- Economy ----
  ledger: [],
  requests: [],
  unlockedItems: [],
  /** slot -> owned item id. What she is actually wearing, as opposed to what
   *  she owns. Separate from unlockedItems on purpose: taking the hat off must
   *  not sell the hat. */
  equippedGear: {},
  dreamGoalId: null,
  rewardEdits: null,

  // ---- Phase 2: Journal, Messages, Schedule ----
  journal: [],
  messages: [],
  /** The editable day plan. Falls back to DEFAULT_SCHEDULE until a grown-up
   *  changes it, so day one is never a blank timetable. */
  scheduleBlocks: DEFAULT_SCHEDULE,
  /** dayKey -> { dayKey, done: { blockId: isoTimestamp } } */
  scheduleDays: {},

  // Lessons, tests and the spaced-review boxes. lessonReads and reviewItems are
  // maps keyed by lessonId / questionId; attempts is an append-only list.
  lessonReads: {},
  /** projectId -> { projectId, startedAt, doneAt, note }. Friday reads this. */
  projectStatus: {},
  attempts: [],
  reviewItems: {},
  lastWarmUpDay: null,
  /** Which bought room look is showing. null = the original greenhouse. */
  roomLook: null,
  /** Khan progress a grown-up has typed in. Newest first. */
  khanGrades: [],
  /** Marks on her book reports and research papers. Newest first. */
  writingMarks: [],

  // Live sitting state — not persisted as a whole; each answer is.
  sittingId: null,
  sittingAnswered: 0,
  currentItem: null,
  currentStrandId: null,
  /** Counter used as the deterministic tie-break for strand and item choice.
   *  Increments forever, so the same question is not re-served on a retake. */
  pickCounter: 0,

  async hydrate() {
    try {
      const [
        rows,
        answers,
        sittings,
        name,
        streak,
        lastDay,
        passcode,
        counter,
        ledger,
        requests,
        unlockedItems,
        equippedGear,
        dreamGoalId,
        rewardEdits,
        journal,
        messages,
        scheduleBlocks,
        scheduleDayRows,
        lessonReadRows,
        projectRows,
        attemptRows,
        reviewRows,
        lastWarmUpDay,
        roomLook,
        khanGradeRows,
        writingMarkRows,
        itemEventRows,
        baselineRows,
        goalRows,
        journalMarkRows,
        writingDraftRows,
        spellingResultRows
      ] = await Promise.all([
        readAllStrandStates(),
        readAnswers(),
        readSittings(),
        readMeta('learnerName', ''),
        readMeta('streak', 0),
        readMeta('lastActiveDay', null),
        readMeta('parentPasscode', null),
        readMeta('pickCounter', 0),
        readLedger(),
        readRequests(),
        readMeta('unlockedItems', []),
        readMeta('equippedGear', {}),
        readMeta('dreamGoalId', null),
        readMeta('rewardEdits', null),
        readJournal(),
        readMessages(),
        readMeta('scheduleBlocks', null),
        readScheduleDays(),
        readLessonReads(),
        readProjects(),
        readAttempts(),
        readReviewItems(),
        readMeta('lastWarmUpDay', null),
        readMeta('roomLook', null),
        readKhanGrades(),
        readWritingMarks(),
        readItemEvents(),
        readBaselines(),
        readGoals(),
        readJournalMarks(),
        readWritingDrafts(),
        loadSpellingResults()
      ]);

      const scheduleDays = {};
      for (const row of scheduleDayRows || []) scheduleDays[row.dayKey] = row;

      const lessonReads = {};
      for (const row of lessonReadRows || []) lessonReads[row.lessonId] = row;

      const projectStatus = {};
      for (const row of projectRows || []) projectStatus[row.projectId] = row;

      const baselines = {};
      for (const row of baselineRows || []) baselines[row.trackId] = row;

      const reviewItems = {};
      for (const row of reviewRows || []) reviewItems[row.questionId] = row;

      const strands = {};
      for (const id of STRAND_IDS) strands[id] = initialStrandState(id);
      for (const row of rows) {
        // Ignore rows for strands that no longer exist rather than crashing —
        // renaming a strand should degrade, not white-screen.
        if (strands[row.strandId]) strands[row.strandId] = row;
      }

      set({
        strands,
        answers,
        sittings,
        itemEvents: itemEventRows || [],
        baselines,
        goals: goalRows || [],
        journalMarks: Object.fromEntries((journalMarkRows || []).map((m) => [m.entryId, m])),
        writingDrafts: Object.fromEntries((writingDraftRows || []).map((w) => [w.slotId, w])),
        spellingResults: (spellingResultRows || []).sort((a, b) => (a.at < b.at ? -1 : 1)),
        learnerName: name,
        streak,
        lastActiveDay: lastDay,
        parentPasscode: passcode,
        pickCounter: counter,
        ledger,
        requests,
        unlockedItems: unlockedItems || [],
        equippedGear: equippedGear || {},
        dreamGoalId,
        rewardEdits,
        journal: journal || [],
        messages: messages || [],
        // A saved schedule wins; otherwise the default. Checked for length so
        // that a grown-up who deletes every block gets the default back rather
        // than an empty screen with no way to add one.
        scheduleBlocks:
          Array.isArray(scheduleBlocks) && scheduleBlocks.length ? scheduleBlocks : DEFAULT_SCHEDULE,
        scheduleDays,
        lessonReads,
        projectStatus,
        reviewItems,
        attempts: (attemptRows || []).sort((a, b) => (a.at < b.at ? -1 : 1)),
        lastWarmUpDay,
        roomLook: roomLook || null,
        khanGrades: (khanGradeRows || []).sort((a, b) => (a.at < b.at ? 1 : -1)),
        writingMarks: (writingMarkRows || []).sort((a, b) => (a.at < b.at ? 1 : -1)),
        hydrated: true,
        hydrationError: null
      });

      // Runs once, ever. Must happen AFTER the ledger and counters are in state,
      // because it compares old rates against new using her real counters.
      await get().runEconomyRebalanceMigration();
    } catch (err) {
      set({ hydrated: false, hydrationError: err?.message || String(err) });
    }
  },

  retryHydrate() {
    set({ hydrationError: null });
    return get().hydrate();
  },

  async setLearnerName(name) {
    await writeMeta('learnerName', name);
    set({ learnerName: name });
  },

  async setParentPasscode(code) {
    await writeMeta('parentPasscode', code);
    set({ parentPasscode: code });
  },

  // -------------------------------------------------------------------------
  // The sitting
  // -------------------------------------------------------------------------

  /** Open a sitting and load the first question. Safe to call twice. */
  async beginSitting() {
    if (get().sittingId) return;
    const now = Date.now();
    const id = await startSitting(now);
    const started = await readMeta('diagnosticStartedAt', null);
    if (!started) await writeMeta('diagnosticStartedAt', now);
    set({ sittingId: id, sittingAnswered: 0 });
    get().loadNextQuestion();
  },

  async endSitting() {
    const { sittingId, sittingAnswered } = get();
    if (sittingId) await endSitting(sittingId, Date.now(), sittingAnswered);
    const sittings = await readSittings();
    set({ sittingId: null, sittingAnswered: 0, currentItem: null, currentStrandId: null, sittings });
  },

  loadNextQuestion() {
    const { strands, pickCounter } = get();
    const lastStrandId = get().currentStrandId;
    const strandId = pickNextStrand(strands, lastStrandId, pickCounter);
    if (!strandId) {
      // Every strand settled — the diagnostic is complete.
      set({ currentItem: null, currentStrandId: null });
      return null;
    }
    const state = strands[strandId];
    const item = chooseItem(itemsForStrand(strandId), state.level, state.seenItemIds, pickCounter);
    set({ currentItem: item, currentStrandId: strandId });
    return item;
  },

  /**
   * Record one answer. Returns the graded result so the UI can show feedback
   * before moving on — the store does NOT advance to the next question here,
   * because she needs to read why an answer was wrong first.
   */
  async submitAnswer(choiceIndex, readAloud = false) {
    const { currentItem, currentStrandId, strands, sittingAnswered, pickCounter } = get();
    if (!currentItem || !currentStrandId) return null;

    const correct = choiceIndex === currentItem.answer;
    const prev = strands[currentStrandId];
    const next = applyAnswer(
      { ...prev, seenItemIds: [...prev.seenItemIds, currentItem.id] },
      correct,
      currentItem.level
    );

    const record = {
      itemId: currentItem.id,
      strandId: currentStrandId,
      level: currentItem.level,
      correct,
      submitted: choiceIndex,
      // Recorded so the Grown-Up Corner can tell a reading level from a
      // listening level. See lib/speech.js for why that distinction matters.
      readAloud: !!readAloud,
      at: Date.now()
    };

    await Promise.all([
      writeStrandState(next),
      appendAnswer(record),
      writeMeta('pickCounter', pickCounter + 1)
    ]);

    // The Check-In writes to `answers` as it always has, AND to itemEvents with
    // evidenceSource: 'diagnostic'. The separation used to be an accident of
    // which table a row happened to live in; now it is a field, so it survives
    // somebody adding a table (anti-pattern 15).
    await get().recordItemEvents([
      {
        questionId: currentItem.id,
        evidenceSource: 'diagnostic',
        correct,
        chosen: choiceIndex,
        readAloud
      }
    ]);

    const newStrands = { ...strands, [currentStrandId]: next };
    set({
      strands: newStrands,
      answers: [...get().answers, record],
      sittingAnswered: sittingAnswered + 1,
      pickCounter: pickCounter + 1
    });

    await get().touchStreak();

    // Mark the whole diagnostic complete the first time every strand settles.
    if (diagnosticProgress(newStrands).complete) {
      const already = await readMeta('diagnosticCompletedAt', null);
      if (!already) await writeMeta('diagnosticCompletedAt', Date.now());
    }

    return {
      correct,
      item: currentItem,
      feedback: correct ? currentItem.explanation : currentItem.choiceFeedback[choiceIndex],
      explanation: currentItem.explanation,
      newLevel: next.level,
      strandSettled: next.settled && !prev.settled
    };
  },

  /** Streak counts DAYS SHE SHOWED UP, not days she scored well. */
  async touchStreak() {
    const today = todayKey();
    const { lastActiveDay, streak } = get();
    if (lastActiveDay === today) return;
    let nextStreak = 1;
    if (lastActiveDay && daysBetween(lastActiveDay, today) === 1) nextStreak = streak + 1;
    await Promise.all([writeMeta('lastActiveDay', today), writeMeta('streak', nextStreak)]);
    set({ lastActiveDay: today, streak: nextStreak });
  },

  // -------------------------------------------------------------------------
  // Economy
  //
  // Every balance here is DERIVED — effort counters plus a fold over the
  // ledger. No balance is ever stored, so no balance can drift away from the
  // events that produced it, and a re-import of the same ledger changes
  // nothing.
  // -------------------------------------------------------------------------

  /**
   * The four monotonic effort counters, all derived from data that already
   * exists. Nothing new is written to make this work.
   *
   * `daysActive` counts DISTINCT LOCAL DATES on which she answered something,
   * not the current streak. The streak resets to 1 when she misses a day, and a
   * balance that shrank because she took a Saturday off would be indefensible.
   */
  counters() {
    const { answers, sittings, strands } = get();
    const days = new Set();
    for (const a of answers) {
      const d = new Date(a.at);
      days.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }
    return {
      questionsAnswered: answers.length,
      strandsSettled: STRAND_IDS.filter((id) => strands[id]?.settled).length,
      sittingsCompleted: sittings.filter((s) => (s.answered || 0) >= SITTING_LENGTH).length,
      daysActive: days.size
    };
  },

  petalBalance() {
    return balanceFor(get().ledger, 'petal', get().counters());
  },

  /** Spendable seeds — what is reserved toward the Dream Reward is deliberately
   *  NOT spendable. That is the entire point of reserving it. */
  seedBalance() {
    return Math.max(0, balanceFor(get().ledger, 'seed', get().counters()) - reservedSeeds(get().ledger));
  },

  seedsReserved() {
    return reservedSeeds(get().ledger);
  },

  /** Reserved seeds plus the match a grown-up will add — what her goal is
   *  really worth today. */
  dreamGoalProgress() {
    const reserved = reservedSeeds(get().ledger);
    return { reserved, match: seedMatchFor(reserved), total: reserved + seedMatchFor(reserved) };
  },

  earningBreakdownFor(currencyId) {
    return earningBreakdown(get().counters(), currencyId);
  },

  totalEarned(currencyId) {
    return earnedFromEffort(get().counters(), currencyId);
  },

  async addLedgerEntry(entry) {
    await appendLedgerEntry(entry);
    set({ ledger: [...get().ledger, entry] });
    return entry;
  },

  /** Buy a Petal Market item. Never needs approval — that is what Petals are. */
  async buyPetalItem(itemId) {
    const item = getPetalItem(itemId);
    if (!item) return { ok: false, reason: 'unknown-item' };
    if (get().unlockedItems.includes(itemId)) return { ok: false, reason: 'already-owned' };
    if (get().petalBalance() < item.cost) return { ok: false, reason: 'not-enough' };

    const entry = makeEntry({
      currency: 'petal',
      amount: -item.cost,
      kind: 'spend',
      source: 'market',
      note: item.name
    });
    const unlocked = [...get().unlockedItems, itemId];
    const writes = [get().addLedgerEntry(entry), writeMeta('unlockedItems', unlocked)];

    // Buying something wearable PUTS IT ON. Making her buy the apron and then
    // hunt for a second control to wear it is the kind of small friction that
    // makes a reward feel like paperwork — and the first thing any child does
    // after buying a hat is look for herself wearing the hat.
    let gear = get().equippedGear;
    if (item.slot) {
      gear = { ...gear, [item.slot]: itemId };
      writes.push(writeMeta('equippedGear', gear));
    }

    await Promise.all(writes);
    set({ unlockedItems: unlocked, equippedGear: gear });
    return { ok: true, item, equipped: !!item.slot };
  },

  /**
   * Record a Khan result.
   *
   * Gigi, §4.1: "No place to enter Khan Academy grades. Four of her subjects
   * are taught by Khan and none of that reaches the record."
   *
   * TYPED BY A GROWN-UP, NEVER BY THE APP. Khan lives outside this app and
   * there is no honest way to read it from here, so an invented number would be
   * worse than no number at all — it would end up on a transcript.
   *
   * WHAT IS STORED IS THE FRACTION SHE READ OFF KHAN — 8 and 10 — and the
   * percent and the letter are worked out from it. Gigi, Aug 24: "I'll type
   * 8/10. The app will make that into a percentage and a letter grade."
   *
   * That is `addWritingMark`'s rule, on purpose: store what was observed, not
   * the conclusion drawn from it, so a total can never quietly disagree with
   * the thing it came from. When Khan shows a word and not a fraction, a
   * letter is passed instead and `gradedFrom` records which it was.
   *
   * Her own screen gets a band, never the letter, same rule as every other
   * score in this app.
   *
   * ---- v3.74: THE ROW IS SHAPED BY A LIB, NOT HERE ----
   *
   * This function used to build the row itself, and the row it built carried
   * no `courseId` and no `unitN` — the two fields `nextUnitFor` requires
   * before it will count a unit as done. So every grade Gigi could have
   * entered was invisible to the thing that advances Azianna, and the Planner
   * would have offered Unit 1 for ever no matter how much work she did.
   *
   * The shaping lives in `src/lib/khanGrade.js` now so `check-khan-advance`
   * can run a grade through this app's own writer and prove the unit moves.
   * A store action cannot be called from a check; a pure function can.
   *
   * ⚠️ DO NOT BUILD THE ROW HERE AGAIN. check-khan-advance reads this file and
   * fails if it does — that is not tidiness, it is the exact regression.
   */
  async addKhanGrade({ courseId, unitN, kind, correct, total, grade, at, note }) {
    const built = khanGradeRow({ courseId, unitN, kind, correct, total, grade, at, note });
    if (!built.ok) return { ok: false, reason: built.reason };
    const clean = built.row;
    await putKhanGrade(clean);
    set({ khanGrades: [clean, ...get().khanGrades].sort((a, b) => (a.at < b.at ? 1 : -1)) });
    return { ok: true, grade: clean };
  },

  async removeKhanGrade(gradeId) {
    await deleteKhanGrade(gradeId);
    set({ khanGrades: get().khanGrades.filter((g) => g.gradeId !== gradeId) });
  },

  /**
   * Record a mark on a book report or a research paper.
   *
   * TYPED BY A GROWN-UP, and what is stored is the MARKS — one integer 1 to 4
   * per rubric row — never the percentage. The percent and the letter are
   * computed from the marks by gradePiece(), so a total can never quietly
   * disagree with the rubric it came from.
   *
   * `readAloud` is recorded rather than hidden, the same way the Check-In
   * records it. Ten of her thirteen Reading and Vocabulary questions were read
   * aloud; a book report requires reading a book. Pretending she read it alone
   * when she did not would make the grade meaningless.
   */
  async addWritingMark({ pieceId, quarter, title, marks, readAloud, at, note }) {
    const clean = {
      markId:
        globalThis.crypto?.randomUUID?.() ||
        `wm-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
      pieceId: String(pieceId || '').trim(),
      quarter: Number(quarter) || 1,
      title: String(title || '').trim(),
      marks: (marks || []).map((m) => Math.max(1, Math.min(4, Math.round(Number(m) || 0)))),
      readAloud: !!readAloud,
      at: at || /* LearningOS, Sept 23 2026: her LOCAL date, not UTC — after 8pm Eastern UTC is already tomorrow. */ dayKeyOf(),
      note: String(note || '').trim(),
      editedAt: Date.now()
    };
    if (!clean.pieceId || !clean.marks.length) {
      return { ok: false, reason: 'needs a piece and a mark on every rubric row' };
    }
    await putWritingMark(clean);
    set({ writingMarks: [clean, ...get().writingMarks].sort((a, b) => (a.at < b.at ? 1 : -1)) });
    return { ok: true, mark: clean };
  },

  async removeWritingMark(markId) {
    await deleteWritingMark(markId);
    set({ writingMarks: get().writingMarks.filter((m) => m.markId !== markId) });
  },

  /**
   * Choose which room look is showing.
   *
   * Owning a look does not apply it — she picks. Buying the Night Greenhouse
   * should not silently turn her dawn room dark, and a purchase that takes an
   * earlier purchase away is the thing the v3.12 rebalance was careful never to
   * do. `null` is the original greenhouse, which is always available and never
   * costs anything.
   */
  async setRoomLook(itemId) {
    if (itemId && !get().unlockedItems.includes(itemId)) return { ok: false, reason: 'not-owned' };
    await writeMeta('roomLook', itemId || null);
    set({ roomLook: itemId || null });
    return { ok: true };
  },

  /** Wear or remove one owned thing. `itemId` null clears the slot. */
  async equipItem(slot, itemId) {
    if (itemId && !get().unlockedItems.includes(itemId)) return { ok: false, reason: 'not-owned' };
    const gear = { ...get().equippedGear };
    if (itemId) gear[slot] = itemId;
    else delete gear[slot];
    await writeMeta('equippedGear', gear);
    set({ equippedGear: gear });
    return { ok: true };
  },

  /**
   * Ask for a real-world reward.
   *
   * Small privileges clear instantly; anything costing real time or money
   * becomes a request a grown-up sees. Seeds do NOT leave her balance when a
   * request is made — only when it is approved. A request that is declined or
   * never answered costs her nothing, which is the only fair way to do it when
   * approval can take days.
   */
  async requestSeedReward(reward) {
    const cost = Number(reward.seeds) || 0;
    if (get().seedBalance() < cost) return { ok: false, reason: 'not-enough' };

    const approval = seedPurchaseApproval(cost, get().ledger, {
      requiresGrownUp: rewardRequiresGrownUp(reward)
    });

    if (approval.auto) {
      const entry = makeEntry({
        currency: 'seed',
        amount: -cost,
        kind: 'spend',
        source: 'auto',
        note: reward.name
      });
      await get().addLedgerEntry(entry);
      return { ok: true, auto: true, reward };
    }

    const request = {
      requestId: newEntryId(),
      rewardId: reward.id,
      name: reward.name,
      icon: reward.icon || '🌟',
      seeds: cost,
      tier: reward.tier,
      status: 'pending', // pending | approved | declined | delivered
      at: new Date().toISOString(),
      decidedAt: null,
      deliveredAt: null,
      note: ''
    };
    await putRequest(request);
    set({ requests: [...get().requests, request] });
    return { ok: true, auto: false, request, reason: approval.reason };
  },

  async cancelRequest(requestId) {
    const req = get().requests.find((r) => r.requestId === requestId);
    if (!req || req.status !== 'pending') return { ok: false };
    const updated = { ...req, status: 'declined', decidedAt: new Date().toISOString(), note: 'Canceled' };
    await putRequest(updated);
    set({ requests: get().requests.map((r) => (r.requestId === requestId ? updated : r)) });
    return { ok: true };
  },

  /** Grown-up approves. THIS is where the seeds actually leave her balance. */
  async decideRequest(requestId, approved, note = '') {
    const req = get().requests.find((r) => r.requestId === requestId);
    if (!req || req.status !== 'pending') return { ok: false };

    if (approved && req.fromGoal) {
      // A Dream Reward cashes in as three entries, in this order, so the
      // history reads like what actually happened: the grown-ups add their
      // match, the saved seeds come back out of the goal, then the reward is
      // paid for out of the combined pile.
      const reserved = get().seedsReserved();
      const match = seedMatchFor(reserved);
      // RE-CHECKED AT APPROVAL, not trusted from the request. She may have
      // taken seeds back off the goal in the days between asking and a grown-up
      // seeing it, and she is allowed to — but approving anyway would spend
      // seeds she no longer has, and the balance clamp would swallow the
      // difference silently instead of failing.
      if (reserved + match + get().seedBalance() < req.seeds) {
        return { ok: false, reason: 'not-enough' };
      }
      await get().addLedgerEntry(
        makeEntry({ currency: 'seed', amount: match, kind: 'match', source: 'grown-up', note: `Match on ${reserved} saved seeds` })
      );
      await get().addLedgerEntry(
        makeEntry({ currency: 'seed', amount: reserved, kind: 'unreserve', source: 'goal', note: 'Cashed in for the Dream Reward' })
      );
      await get().addLedgerEntry(
        makeEntry({ currency: 'seed', amount: -req.seeds, kind: 'spend', source: 'approved', note: req.name })
      );
    } else if (approved) {
      if (get().seedBalance() < req.seeds) return { ok: false, reason: 'not-enough' };
      await get().addLedgerEntry(
        makeEntry({
          currency: 'seed',
          amount: -req.seeds,
          kind: 'spend',
          source: 'approved',
          note: req.name
        })
      );
    }
    const updated = {
      ...req,
      status: approved ? 'approved' : 'declined',
      decidedAt: new Date().toISOString(),
      note
    };
    await putRequest(updated);
    set({ requests: get().requests.map((r) => (r.requestId === requestId ? updated : r)) });
    return { ok: true };
  },

  async markDelivered(requestId) {
    const req = get().requests.find((r) => r.requestId === requestId);
    if (!req || req.status !== 'approved') return { ok: false };
    const updated = { ...req, status: 'delivered', deliveredAt: new Date().toISOString() };
    await putRequest(updated);
    set({ requests: get().requests.map((r) => (r.requestId === requestId ? updated : r)) });
    return { ok: true };
  },

  /** Grown-up bonus or adjustment. Signed: negative deducts. */
  async adjustBalance(currency, amount, note) {
    const n = Math.round(Number(amount) || 0);
    if (n === 0) return { ok: false };
    await get().addLedgerEntry(
      makeEntry({
        currency,
        amount: n,
        kind: n > 0 ? 'grant' : 'deduct',
        source: 'grown-up',
        note: note || (n > 0 ? 'Bonus' : 'Adjustment')
      })
    );
    return { ok: true };
  },

  async setDreamGoal(rewardId) {
    await writeMeta('dreamGoalId', rewardId);
    set({ dreamGoalId: rewardId });
  },

  /** Move seeds into the Dream Goal, where they stop being spendable.
   *  Reserving does not destroy seeds — sumEntries() skips these kinds, so the
   *  total she has earned is unchanged and only what she can SPEND goes down. */
  async reserveToGoal(amount) {
    const n = Math.max(0, Math.round(Number(amount) || 0));
    if (n === 0 || get().seedBalance() < n) return { ok: false, reason: 'not-enough' };
    await get().addLedgerEntry(
      makeEntry({ currency: 'seed', amount: n, kind: 'reserve', source: 'goal', note: 'Saved toward Dream Reward' })
    );
    return { ok: true };
  },

  /** Take seeds back off the goal. She is allowed to change her mind; a saving
   *  system that traps her money teaches the wrong lesson about saving. */
  async unreserveFromGoal(amount) {
    const n = Math.max(0, Math.round(Number(amount) || 0));
    if (n === 0 || get().seedsReserved() < n) return { ok: false, reason: 'not-enough' };
    await get().addLedgerEntry(
      makeEntry({ currency: 'seed', amount: n, kind: 'unreserve', source: 'goal', note: 'Taken back off the goal' })
    );
    return { ok: true };
  },

  /**
   * Ask to cash in the Dream Reward. Always needs a grown-up, whatever the
   * price — this is the one that costs a real day out.
   */
  async requestDreamGoal(reward) {
    const { reserved, match, total } = get().dreamGoalProgress();
    const cost = Number(reward.seeds) || 0;
    if (total < cost) return { ok: false, reason: 'not-enough', short: cost - total };
    const request = {
      requestId: newEntryId(),
      rewardId: reward.id,
      name: reward.name,
      icon: reward.icon || '🌟',
      seeds: cost,
      tier: reward.tier,
      fromGoal: true,
      reservedAtRequest: reserved,
      matchAtRequest: match,
      status: 'pending',
      at: new Date().toISOString(),
      decidedAt: null,
      deliveredAt: null,
      note: ''
    };
    await putRequest(request);
    set({ requests: [...get().requests, request] });
    return { ok: true, request };
  },

  async setRewardEdits(edits) {
    await writeMeta('rewardEdits', edits);
    set({ rewardEdits: edits });
  },

  async resetAll() {
    await resetEverything();
    const strands = {};
    for (const id of STRAND_IDS) strands[id] = initialStrandState(id);
    set({
      strands,
      answers: [],
      sittings: [],
      sittingId: null,
      sittingAnswered: 0,
      currentItem: null,
      currentStrandId: null,
      ledger: [],
      requests: [],
      unlockedItems: [],
      equippedGear: {},
      dreamGoalId: null
    });
  },


  // -------------------------------------------------------------------------
  // Phase 2 — the Journal
  //
  // EARNING IS BY EFFORT, NEVER BY QUALITY. She is paid for writing an entry
  // that reaches the length threshold, and the amount is identical whether the
  // entry is beautiful or barely coherent. The moment an app pays more for
  // "better" writing it has taught a nine-year-old to write for the machine,
  // and every entry after that is aimed at the scoring rule instead of at the
  // thing she saw. Same principle as the diagnostic, where effort pays and
  // accuracy does not.
  //
  // The award is appended to the ledger with an entryId derived from the
  // journal entry's own id, so editing an entry she already got paid for cannot
  // pay her twice: the second put() overwrites the first row instead of adding
  // a second one.
  // -------------------------------------------------------------------------

  async saveJournalEntry({ entryId = null, kind = 'notice', prompt = '', text = '' }) {
    const now = new Date().toISOString();
    const existing = entryId ? get().journal.find((e) => e.entryId === entryId) : null;
    const id = entryId || newEntryId();
    const entry = {
      entryId: id,
      kind,
      prompt,
      text: String(text || ''),
      words: wordCount(text),
      at: existing?.at || now,
      editedAt: existing ? now : null
    };
    await putJournalEntry(entry);

    const journal = existing
      ? get().journal.map((e) => (e.entryId === id ? entry : e))
      : [...get().journal, entry];
    set({ journal });

    // Pay once the entry is long enough to be a real entry. Deterministic
    // entryId keeps a re-save from paying again.
    const kindMin = { notice: 8, plant: 12, pressed: 8, write: 40 }[kind] ?? 8;
    if (entry.words >= kindMin) {
      const award = {
        ...makeEntry({
          currency: 'petal',
          amount: kind === 'write' ? 25 : 12,
          kind: 'grant',
          source: 'journal',
          note: `Journal: ${kind}`,
          at: entry.at
        }),
        entryId: `journal-${id}`
      };
      await appendLedgerEntry(award);
      const ledger = [...get().ledger.filter((e) => e.entryId !== award.entryId), award];
      set({ ledger });
    }
    return entry;
  },

  async removeJournalEntry(entryId) {
    await deleteJournalEntry(entryId);
    set({ journal: get().journal.filter((e) => e.entryId !== entryId) });
  },

  journalByDay() {
    const out = {};
    for (const e of get().journal) {
      const day = String(e.at).slice(0, 10);
      (out[day] = out[day] || []).push(e);
    }
    return out;
  },

  journalWordTotal() {
    return get().journal.reduce((n, e) => n + (Number(e.words) || 0), 0);
  },

  // -------------------------------------------------------------------------
  // Phase 2 — Messages from Gigi and Mom
  //
  // TWO SENDERS, and the sender is stored on the message rather than being a
  // setting on the app. Both of them write from the same Grown-Up Corner on the
  // same laptop, so "who is writing right now" cannot be a mode — it has to be
  // chosen per note, or every message her mother writes will arrive signed by
  // her grandmother.
  // -------------------------------------------------------------------------

  async sendMessage({ from = 'gigi', text = '', sticker = '' }) {
    const message = {
      messageId: newEntryId(),
      from,
      text: String(text || '').trim(),
      sticker,
      at: new Date().toISOString(),
      readAt: null
    };
    if (!message.text) return null;
    await putMessage(message);
    set({ messages: [...get().messages, message] });
    return message;
  },

  async markMessageRead(messageId) {
    const found = get().messages.find((m) => m.messageId === messageId);
    if (!found || found.readAt) return;
    const updated = { ...found, readAt: new Date().toISOString() };
    await putMessage(updated);
    set({ messages: get().messages.map((m) => (m.messageId === messageId ? updated : m)) });
  },

  async removeMessage(messageId) {
    await deleteMessage(messageId);
    set({ messages: get().messages.filter((m) => m.messageId !== messageId) });
  },

  unreadMessages() {
    return get().messages.filter((m) => !m.readAt);
  },

  messagesNewestFirst() {
    return [...get().messages].sort((a, b) => String(b.at).localeCompare(String(a.at)));
  },

  // -------------------------------------------------------------------------
  // Phase 2 — the Daily Schedule
  // -------------------------------------------------------------------------

  async saveScheduleBlocks(blocks) {
    const clean = Array.isArray(blocks) ? blocks : [];
    await writeMeta('scheduleBlocks', clean);
    set({ scheduleBlocks: clean.length ? clean : DEFAULT_SCHEDULE });
  },

  async resetScheduleBlocks() {
    await writeMeta('scheduleBlocks', null);
    set({ scheduleBlocks: DEFAULT_SCHEDULE });
  },

  /** Tick or un-tick a block for a given day. Un-ticking is deliberate: a child
   *  who taps the wrong row needs to take it back without asking anyone. */
  async toggleScheduleBlock(dayKey, blockId) {
    const existing = get().scheduleDays[dayKey] || { dayKey, done: {} };
    const done = { ...existing.done };
    if (done[blockId]) delete done[blockId];
    else done[blockId] = new Date().toISOString();
    // v3.43: spreads `existing`. It used to build `{ dayKey, done }` from
    // scratch, which silently dropped every other field on the row — so the
    // first tick of the morning would have switched the bell back off, and the
    // symptom would have been "the bell keeps turning itself off" all over
    // again, one layer down.
    const row = { ...existing, dayKey, done };
    await putScheduleDay(row);
    set({ scheduleDays: { ...get().scheduleDays, [dayKey]: row } });
  },

  /**
   * Turn the bell on for the whole of one school day.
   *
   * Gigi: "it will not turn off until the end of the school day once it is
   * turned on." Until v3.43 `bellOn` was component state inside TodayView, so
   * it reset every time she left the tab or the page reloaded — the bell was
   * not turning itself off, it was never being remembered at all.
   *
   * ⚠️ THIS MUST NOT COUNT AS ATTENDANCE. `daysAttended()` counts days with at
   * least one TICKED BLOCK, and a row carrying only `bellOn` has `done: {}`, so
   * it is not counted. That is deliberate and it is the v3.18 rule: ticking
   * lunch once added twenty minutes to a legal record. Switching a bell on is
   * not school.
   */
  async setBellOnForDay(dayKey) {
    const existing = get().scheduleDays[dayKey] || { dayKey, done: {} };
    const row = { ...existing, dayKey, done: existing.done || {}, bellOn: true };
    await putScheduleDay(row);
    set({ scheduleDays: { ...get().scheduleDays, [dayKey]: row } });
  },

  /** The day key the bell was last switched on for, or null. */
  bellOnDayKey() {
    const days = Object.values(get().scheduleDays || {});
    const on = days.filter((d) => d && d.bellOn).map((d) => d.dayKey).sort();
    return on.length ? on[on.length - 1] : null;
  },

  doneToday(dayKey) {
    return get().scheduleDays[dayKey]?.done || {};
  },

  /** Days on which she ticked at least one block. Phase 4's attendance record
   *  is built from this, which is why un-ticking everything removes the day. */
  daysAttended() {
    return Object.values(get().scheduleDays).filter((d) => Object.keys(d.done || {}).length > 0)
      .length;
  },


  // -------------------------------------------------------------------------
  // LESSONS, TESTS AND SPACED REVIEW
  //
  // Three actions do all the work here, and the third one is the one that
  // matters most: every answer she gives ANYWHERE — a lesson check, a warm-up,
  // a unit test, a quarter test — goes through the same review boxes. One
  // question, one memory of how she has done on it, whatever screen she met it
  // on. Splitting that per screen would mean a question she keeps missing in
  // tests never comes back in her warm-ups, which is exactly backwards.
  // -------------------------------------------------------------------------

  /**
   * She finished a lesson. This is what unlocks its unit test.
   *
   * `practice` is the practice-gate result — how the lesson's own check went,
   * whether it cleared the gate, and how much extra practice she needed. It is
   * stored as the LATEST attempt, not the best one: a lesson she re-read and
   * then passed should stop nagging, and a lesson she passed in September and
   * fumbled in March should say so.
   */
  /**
   * Mark a project started or finished.
   *
   * Petals are paid ONCE, on the first finish, and they are paid for finishing —
   * never for how it turned out. Same rule as the Journal and the same reason: a
   * project that gets marked down is a project she does the minimum of.
   *
   * Un-finishing is allowed and costs nothing back. She is ten; she is allowed
   * to decide it is not done after all.
   */
  async setProjectDone(projectId, done, note = null) {
    const now = new Date().toISOString();
    const existing = get().projectStatus[projectId] || { projectId, startedAt: now };
    const wasDone = Boolean(existing.doneAt);
    const row = {
      ...existing,
      projectId,
      doneAt: done ? existing.doneAt || now : null,
      note: note ?? existing.note ?? null
    };
    await putProject(row);
    set({ projectStatus: { ...get().projectStatus, [projectId]: row } });
    if (done && !wasDone) {
      await get().addLedgerEntry(
        makeEntry({
          currency: 'petal',
          amount: PETALS.project,
          kind: 'grant',
          source: 'project-finished',
          note: `Finished a project: ${projectId}`
        })
      );
      await get().addLedgerEntry(
        makeEntry({
          currency: 'seed',
          amount: SEEDS.project,
          kind: 'grant',
          source: 'project-finished',
          note: `Finished a project: ${projectId}`
        })
      );
    }
    return row;
  },

  /**
   * THE v3.12 GRANDFATHERING, run once.
   *
   * Her balance is COMPUTED from the effort counters, not stored. So lowering the
   * per-question rate does not only change what she earns next — it retroactively
   * shrinks what she already has. Left alone, the rebalance would have taken about
   * 515 petals and 260 seeds off a ten-year-old overnight, for a mistake that was
   * mine.
   *
   * So: work out the gap between the old rates and the new ones, and write it as
   * one real ledger entry. A visible entry rather than a hidden adjustment, so the
   * Grown-Up Corner can show exactly what happened and why.
   *
   * Guarded by a meta flag. Runs once, ever, and is safe to call on every boot.
   */
  async runEconomyRebalanceMigration() {
    if (await readMeta('economyRebalanceV2', false)) return { ran: false };
    const owed = legacyTopUp(get().counters());
    const written = [];
    for (const currency of ['petal', 'seed']) {
      const amount = owed[currency] || 0;
      if (amount <= 0) continue;
      const entry = {
        ...makeEntry({
          currency,
          amount,
          kind: 'grant',
          source: 'rebalance-v2',
          note: 'Kept from before the earning rates changed'
        }),
        entryId: `rebalance-v2-${currency}`
      };
      await appendLedgerEntry(entry);
      written.push(entry);
    }
    if (written.length) {
      set({ ledger: [...get().ledger.filter((e) => !String(e.entryId).startsWith('rebalance-v2-')), ...written] });
    }
    await writeMeta('economyRebalanceV2', true);
    return { ran: true, owed };
  },

  /**
   * The Check-In completion bonus, paid once when every strand has settled.
   *
   * Finishing it is a real thing and it is genuinely dull, so it is still paid
   * properly. It is simply no longer worth more than a whole term.
   */
  async payDiagnosticBonusIfComplete() {
    const settled = STRAND_IDS.every((id) => get().strands[id]?.settled);
    if (!settled) return { paid: false };
    if (get().ledger.some((e) => e.entryId === 'diagnostic-complete-petal')) return { paid: false };
    for (const currency of ['petal', 'seed']) {
      const amount = DIAGNOSTIC_COMPLETE_BONUS[currency] || 0;
      if (amount <= 0) continue;
      const entry = {
        ...makeEntry({
          currency,
          amount,
          kind: 'grant',
          source: 'diagnostic-complete',
          note: 'Finished the whole Check-In'
        }),
        entryId: `diagnostic-complete-${currency}`
      };
      await appendLedgerEntry(entry);
      set({ ledger: [...get().ledger.filter((e) => e.entryId !== entry.entryId), entry] });
    }
    return { paid: true };
  },

  /** Everything still open, for the Friday screen. Never blocks anything. */
  catchUp() {
    return catchUpList({
      lessonsRead: Object.keys(get().lessonReads || {}),
      attemptsByTest: get().attemptsByTest(),
      projectStatus: get().projectStatus || {}
    });
  },

  async markLessonRead(lessonId, practice = null) {
    const now = new Date().toISOString();

    // ---- THE BASELINE, CAPTURED THE FIRST TIME SHE TOUCHES A COURSE ----
    //
    // §3.4: "A baseline cannot be reconstructed after the fact… ship baseline
    // capture before or alongside the first learning-science change you intend
    // to evaluate." The finish screen, the rubric and the practice gate all
    // changed on Aug 18 2026. This is the row that makes it possible to ask, a
    // year from now, whether any of it helped.
    //
    // WHAT IT IS NOT: a benchmark. This app has no fixed-form instrument, and
    // §3.10.8 forbids computing growth across different instruments. So the
    // baseline records what was actually true at the starting line — the date,
    // and the Check-In levels standing at that moment — and says so in the row
    // rather than dressing it up as a score.
    const lesson = lessonById(lessonId);
    if (lesson?.course && !get().baselines[lesson.course]) {
      const strands = get().strands || {};
      await get().captureBaseline(lesson.course, {
        instrument: 'none',
        note: 'Where she stood the first time this course was opened. Not a benchmark — this app has no fixed-form instrument, so growth may not be computed across it (§3.10.8).',
        firstLessonId: lessonId,
        lessonsReadInCourse: 0,
        strandLevels: Object.fromEntries(
          Object.values(strands)
            .filter((st) => st && typeof st.level === 'number')
            .map((st) => [st.strandId, { level: st.level, asked: st.asked || 0, settled: !!st.settled }])
        )
      });
    }
    const existing = get().lessonReads[lessonId];
    const row = existing
      ? { ...existing, lastReadAt: now, reads: (existing.reads || 1) + 1 }
      : { lessonId, firstReadAt: now, lastReadAt: now, reads: 1 };
    if (practice) row.practice = practice;
    await putLessonRead(row);
    set({ lessonReads: { ...get().lessonReads, [lessonId]: row } });

    // Petals for the work. A FIRST read is paid because reading the lesson is
    // the effort; a RE-read is paid separately because going back after a miss
    // is the behaviour most worth encouraging and the one that feels least like
    // progress. Before v3.12 only the re-read paid, so a child could read all
    // ninety-six lessons and earn nothing for any of them.
    await get().addLedgerEntry(
      makeEntry({
        currency: 'petal',
        amount: existing ? PETALS.lessonRevisit : PETALS.lessonRead,
        kind: 'grant',
        source: existing ? 'lesson-revisit' : 'lesson-read',
        note: existing ? `Went back to ${lessonId}` : `Read ${lessonId}`
      })
    );
  },

  /**
   * Move a set of answers through the Leitner boxes.
   *
   * `results` is [{ questionId, correct }]. Called by the warm-up, by every
   * test, and by a lesson's own check questions.
   */
  /**
   * ONE ROW PER ANSWER, FROM EVERY SURFACE. Added v3.56.
   *
   * ---- WHY ----
   *
   * §3.4 wants `evidenceSource` on every item event, and anti-pattern 15 says
   * why: "diagnostic answers scored into the same mastery number as taught
   * practice." The Check-In asks Azianna things nobody has taught her, on
   * purpose — that is how it finds a ceiling. Those misses must never land in
   * the same number as a lesson she has actually been taught, or the app
   * reports a deficit it created.
   *
   * ---- AND THE WARM-UP KEPT NOTHING AT ALL ----
   *
   * Tests already keep their working: an attempt row holds every question,
   * what she picked, and whether it was right. The audit said otherwise and
   * Batch A was sized on that; reading the code corrected it.
   *
   * The warm-up was the real hole. Three questions every morning, and the only
   * trace was a Leitner box moving — not which question, not what she picked,
   * not whether she needed a second go. And it is the STRONGEST evidence in
   * the app, because it is retrieval days after the lesson rather than
   * recognition ten minutes after it (§3.6).
   *
   * Nothing here throws. A record of what happened must never be the reason
   * the thing that happened fails.
   */
  async recordItemEvents(rows) {
    const dayKey = dayKeyOf();
    const at = new Date().toISOString();
    const clean = (rows || [])
      .filter((r) => r && r.questionId && isEvidenceSource(r.evidenceSource))
      .map((r) => ({
        eventId: newEntryId(),
        questionId: r.questionId,
        lessonId: r.lessonId ?? null,
        evidenceSource: r.evidenceSource,
        attemptState: isAttemptState(r.attemptState) ? r.attemptState : 'complete',
        correct: !!r.correct,
        chosen: r.chosen ?? null,
        attemptNumber: r.attemptNumber ?? 1,
        readAloud: !!r.readAloud,
        dayKey,
        at
      }));
    if (!clean.length) return;
    await appendItemEvents(clean);
    set({ itemEvents: [...get().itemEvents, ...clean] });
  },

  /**
   * Where a track started. Written ONCE, the first time she does anything in it.
   *
   * §3.4: "A baseline cannot be reconstructed after the fact… the data is free
   * on day one and impossible on day two hundred." Every change made on Aug 18
   * — the finish screen, the rubric, the practice gate — is a change somebody
   * will want to evaluate. Without this the only honest answer to "did that
   * help?" a year from now is "we don't know."
   *
   * The never-overwrite rule lives in captureBaselineOnce, at the database
   * boundary, rather than here — a second caller can be added tomorrow.
   */
  async captureBaseline(trackId, measure) {
    if (!trackId) return null;
    if (get().baselines[trackId]) return get().baselines[trackId];
    const row = await captureBaselineOnce({
      trackId,
      capturedOn: new Date().toISOString(),
      dayKey: dayKeyOf(),
      ...measure
    });
    set({ baselines: { ...get().baselines, [trackId]: row } });
    return row;
  },

  /**
   * MARK ONE JOURNAL ENTRY. Added v3.68.
   *
   * ⚠️ THIS OVERTURNS THE LOCKED RULE, and the reason is Gigi's, Aug 19 2026.
   * Asked whether a separate graded daily piece would be better than marking
   * the journal: "she isn't going to want to do the daily writing and the
   * journal." One task graded beats two where the graded one is the chore.
   *
   * NOT ONE CHARACTER OF HER ENTRY IS TOUCHED. The mark is its own row in its
   * own table, keyed by entryId. That was the condition.
   *
   * Passing no levels DELETES the row rather than storing an empty one — an
   * unmarked entry has NO row, because §3.13.1: "a missing grade and a zero are
   * opposite facts."
   */
  async markJournalEntry(entryId, levels, note = '') {
    if (!entryId) return null;
    const any = Object.values(levels || {}).some((l) => typeof l === 'number' && l >= 1 && l <= 4);
    if (!any) {
      await clearJournalMark(entryId);
      const rest = { ...get().journalMarks };
      delete rest[entryId];
      set({ journalMarks: rest });
      return null;
    }
    const existing = get().journalMarks[entryId];
    const row = {
      entryId,
      levels: { ...levels },
      note: String(note || ''),
      dayKey: dayKeyOf(),
      at: existing?.at || new Date().toISOString(),
      editedAt: new Date().toISOString()
    };
    await putJournalMark(row);
    set({ journalMarks: { ...get().journalMarks, [entryId]: row } });
    return row;
  },

  /** The mark for one entry, or null. Never invents one. */
  journalMarkFor(entryId) {
    return get().journalMarks[entryId] || null;
  },

  async recordReview(results, source = 'practice') {
    const dayKey = dayKeyOf();
    const current = { ...get().reviewItems };
    const changed = [];
    for (const r of results || []) {
      const existing = current[r.questionId] || newReviewItem(r.questionId, source, dayKey);
      // A brand new item goes through applyReviewAnswer too, rather than being
      // filed as "new". She has just answered it — that IS a retrieval, and it
      // should set the first interval rather than being thrown away.
      const next = applyReviewAnswer(existing, r.correct, dayKey);
      current[r.questionId] = next;
      changed.push(next);
    }
    if (changed.length) await putReviewItems(changed);
    set({ reviewItems: current });
  },

  /**
   * Record a completed test.
   *
   * The attempt row holds every question, what she picked, and whether it was
   * right — not just the score. A percentage with no working behind it cannot
   * be checked by anyone later, and this is the record a 4th grade transcript
   * is built from.
   */
  /**
   * Record a reading check. v3.80.
   *
   * ⚠️ IT WRITES readAloud ON EVERY ROW, AND THAT IS THE POINT OF IT. The
   * weekly tests do not — `recordAttempt` below has never carried the flag,
   * because for a Herbalism paper it is a nice-to-have. Here it is the
   * measurement: without it this produces one more listening score wearing a
   * reading score's name.
   *
   * evidenceSource is 'test' — it counts toward mastery, like every other paper
   * she sits in this app. It is NOT 'diagnostic': §3.10.6 keeps placement
   * evidence out of mastery, and this is not a placement instrument. It also
   * therefore moves no strand level, which is correct — one paper does not
   * re-place a child.
   *
   * ⚠️ AND IT NEVER TOUCHES khanGrades. v3.76's rule from a third direction: a
   * unit test, a Course Challenge and a check this app wrote are three different
   * things. A row here must never advance her Khan unit, because Khan has not
   * seen this paper.
   */
  /**
   * Save a book report draft. v3.82.
   *
   * ⚠️ NOTHING HERE GRADES ANYTHING, AND NOTHING HERE TICKS A STEP THAT HAS NO
   * WRITING BEHIND IT.
   *
   * Lamar's rule, Aug 15 2026: "A book report ticked but not written leaves the
   * app recording that work happened while holding no evidence of it. For a
   * homeschool portfolio that is backwards — the artifact IS the record."
   *
   * `patch` carries any of { bookTitle, notes, draft, steps }. The two text
   * fields are written separately and one may never overwrite the other — see
   * pickWritingDraft. The mark still lives in `writingMarks`, where Gigi puts
   * it, and is kept apart from the words the same way a journal mark is kept
   * apart from the entry: a bad merge can lose a MARK, never a word she wrote.
   */
  async saveWritingDraft(slotId, patch) {
    if (!slotId) return null;
    const existing = get().writingDrafts[slotId] || {
      slotId,
      formatId: null,
      bookTitle: '',
      notes: '',
      draft: '',
      // v3.83 — THE THIRD BOX. His writer has notes, draft AND final, and v3.82
      // built two because it read his notes instead of his code. The polish week
      // needs somewhere to land that is not the rough draft: overwriting the
      // draft with the fixed version destroys the evidence that she revised at
      // all, which is the one thing the last step exists to produce.
      final: '',
      checked: {},
      steps: []
    };
    const row = {
      ...existing,
      ...patch,
      slotId,
      steps: [...new Set(patch.steps ?? existing.steps ?? [])].sort((a, b) => a - b),
      checked: patch.checked ?? existing.checked ?? {},
      updatedAt: new Date().toISOString()
    };
    await putWritingDraft(row);
    set({ writingDrafts: { ...get().writingDrafts, [slotId]: row } });
    return row;
  },

  /**
   * Tick or un-tick one weekly step.
   *
   * ⚠️ STEP 4 CANNOT BE TICKED ON AN EMPTY DRAFT. Step 4 is "read it out loud,
   * then fix it and hand it in" — the step that says the report is finished. A
   * tick there with nothing in the draft box is precisely the checkbox-without-
   * an-artifact this table was added to prevent, and it would put a finished
   * book report on a Georgia portfolio holding no writing.
   *
   * The earlier steps are free to tick. Reading a book leaves no artifact in an
   * app and pretending otherwise would make her type something to prove she
   * read — which is how a child learns to type something to get past a screen.
   */
  async toggleWritingStep(slotId, n) {
    const row = get().writingDrafts[slotId] || { slotId, bookTitle: '', notes: '', draft: '', final: '', steps: [] };
    const have = new Set(row.steps || []);
    const finalStep = WRITING_FINAL_STEP;
    // ⚠️ THE LAST STEP NEEDS THE FINISHED PIECE, NOT THE ROUGH DRAFT. v3.83.
    // v3.82 checked `draft`, which meant the polish week could be ticked on last
    // week's unrevised writing — the checkbox-without-an-artifact bug moved one
    // box along rather than fixed. "Edit and finish" claims a finished piece
    // exists; this is what makes that claim true.
    if (!have.has(n) && n === finalStep && !String(row.final || '').trim()) {
      return { ok: false, reason: 'nothing-finished' };
    }
    if (have.has(n)) have.delete(n);
    else have.add(n);
    await get().saveWritingDraft(slotId, { steps: [...have] });
    return { ok: true };
  },

  /**
   * RESEARCH PAPER steps (Academic Center, Sept 24 2026).
   *
   * Ticking: only her current step, and only with writing in its box
   * (canTickResearch in lib/academicCenter.js), for the same reason as the
   * book report's last step: a ticked step with nothing written is a record of
   * work that is not there. Un-ticking is always allowed, so a mis-tap is
   * fixable, and it takes every later step with it, so the steps stay in order.
   */
  async toggleResearchStep(quarter, n) {
    const slotId = researchSlot(quarter);
    const row = get().writingDrafts[slotId] || { slotId, steps: [] };
    const have = new Set(row.steps || []);
    if (have.has(n)) {
      for (const s of [...have]) if (s >= n) have.delete(s);
    } else {
      if (!canTickResearch(quarter, n, row)) return { ok: false, reason: 'empty-or-out-of-order' };
      have.add(n);
    }
    await get().saveWritingDraft(slotId, { steps: [...have] });
    return { ok: true };
  },

  /**
   * GROWN-UP SETUP for the Academic Center (Sept 24 2026). One row in
   * writingDrafts, 'academic-setup', so backups carry it. A book a grown-up
   * chooses for a quarter is also written into that quarter's book report, so
   * her book report shows it.
   */
  async saveAcademicSetup(patch) {
    const row = await get().saveWritingDraft(SETUP_SLOT, patch || {});
    if (patch && patch.bookFor) {
      for (const [q, b] of Object.entries(patch.bookFor)) {
        if (b && b.title) await get().saveWritingDraft(bookReportSlot(Number(q)), { bookTitle: b.title });
      }
    }
    return row;
  },

  /**
   * Record one sat spelling test.
   *
   * ⚠️ APPENDED, NEVER UPDATED. Keyed by a UUID like `attempts`, because a week
   * can be sat twice and keying on the week would destroy the first result.
   *
   * ⚠️ AND NO `unaidedPercent`. Everywhere else in this app that number exists
   * because being read to contaminates the measurement. A SPELLING TEST IS THE
   * OPPOSITE — hearing the word IS the test, and the word is deliberately not
   * on screen while she types. A number that means nothing is worse than no
   * number, because somebody will grade her against it.
   */
  async recordSpellingResult(listId, grade, meta = {}) {
    const row = {
      resultId: newEntryId(),
      listId,
      kind: 'spelling',
      dayKey: dayKeyOf(),
      at: new Date().toISOString(),
      week: meta.week ?? null,
      quarter: meta.quarter ?? null,
      weekInQuarter: meta.weekInQuarter ?? null,
      right: grade.right,
      total: grade.total,
      percent: grade.percent,
      letter: grade.letter,
      carriedCount: meta.carriedCount ?? 0,
      // Sept 24 2026: the word week this test closes (lib/wordWeek.js). Friday's
      // spelling test is what marks that week's Friday done.
      weekOf: meta.weekOf ?? null,
      rows: grade.rows.map((r) => ({
        word: r.word,
        from: r.from,
        given: r.given,
        correct: r.correct,
        skipped: r.skipped
      }))
    };
    await putSpellingResult(row);
    set({ spellingResults: [...get().spellingResults, row] });

    // Petals for SITTING it, never for the score — the rule the weekly tests
    // and the reading check both follow. She has to be able to walk into a
    // spelling test she might fail without it costing her anything.
    await get().addLedgerEntry(
      makeEntry({
        currency: 'petal',
        amount: PETALS.unitTest,
        kind: 'grant',
        source: 'test-taken',
        note: 'Sat a spelling test'
      })
    );
    return row;
  },

  /**
   * One day's Spelling or Vocabulary activity is done (Mon–Thu), Sept 24 2026.
   * Filed in spellingResults with kind 'word-activity' and no `percent`, so it
   * marks the day done and never reaches a grade. lib/wordWeek.js reads it.
   */
  async recordWordActivity({ skill, weekOf, task, right, total }) {
    const row = {
      resultId: newEntryId(),
      kind: 'word-activity',
      skill,
      weekOf,
      task,
      dayKey: dayKeyOf(),
      at: new Date().toISOString(),
      right: right ?? null,
      total: total ?? null
    };
    await putSpellingResult(row);
    set({ spellingResults: [...get().spellingResults, row] });
    await get().addLedgerEntry(
      makeEntry({ currency: 'petal', amount: PETALS.warmUp, kind: 'grant', source: 'word-practice', note: `Word practice: ${skill} ${task}` })
    );
    return row;
  },

  /**
   * Friday's VOCABULARY TEST (Sept 24 2026). Same table and same shape as the
   * spelling test, kind 'vocab-test'. A word right here is done; the rest carry.
   */
  async recordVocabTest(listId, grade, meta = {}) {
    const row = {
      resultId: newEntryId(),
      listId,
      kind: 'vocab-test',
      dayKey: dayKeyOf(),
      at: new Date().toISOString(),
      week: meta.week ?? null,
      quarter: meta.quarter ?? null,
      weekInQuarter: meta.weekInQuarter ?? null,
      weekOf: meta.weekOf ?? null,
      right: grade.right,
      total: grade.total,
      percent: grade.percent,
      letter: grade.letter,
      rows: grade.rows.map((r) => ({ word: r.word, type: r.type, chosen: r.chosen, correct: r.correct }))
    };
    await putSpellingResult(row);
    set({ spellingResults: [...get().spellingResults, row] });
    await get().addLedgerEntry(
      makeEntry({ currency: 'petal', amount: PETALS.unitTest, kind: 'grant', source: 'test-taken', note: 'Sat a vocabulary test' })
    );
    return row;
  },

  async recordReadingCheck(form, grade) {
    const attempt = {
      attemptId: newEntryId(),
      testId: form.testId,
      kind: 'reading-check',
      title: form.title,
      attempt: form.attempt ?? 1,
      dayKey: dayKeyOf(),
      at: new Date().toISOString(),
      right: grade.right,
      total: grade.total,
      percent: grade.percent,
      letter: grade.letter,
      // The whole reason this exists. Null-safe: unaidedPercent is null when
      // every question was read to her, and null is not zero.
      unaidedRight: grade.unaidedRight,
      unaidedCount: grade.unaidedCount,
      unaidedPercent: grade.unaidedPercent,
      unaidedLetter: grade.unaidedLetter,
      aloudCount: grade.aloudCount,
      khanCourse: form.khanCourse,
      khanUnit: form.khanUnit,
      rows: grade.rows.map((r) => ({
        questionId: r.questionId,
        passage: r.passage,
        chosen: r.chosen,
        answer: r.answer,
        correct: r.correct,
        skipped: r.skipped,
        readAloud: r.readAloud
      }))
    };
    await putAttempt(attempt);
    set({ attempts: [...get().attempts, attempt] });

    await get().recordItemEvents(
      grade.rows.map((r) => ({
        questionId: r.questionId,
        evidenceSource: 'test',
        attemptState: r.skipped ? 'abandoned' : 'complete',
        correct: r.correct,
        chosen: r.chosen,
        readAloud: r.readAloud
      }))
    );

    // Petals for SITTING it, never for the score — the same rule the weekly
    // tests follow. She has to be able to walk into a reading test she might
    // fail without it costing her anything, and this is the one subject where
    // she has most reason to expect to fail.
    await get().addLedgerEntry(
      makeEntry({
        currency: 'petal',
        amount: PETALS.unitTest,
        kind: 'grant',
        source: 'test-taken',
        note: `Sat ${form.title}`
      })
    );
    return attempt;
  },

  /**
   * A piece of her READING COURSE is finished: a lesson, a Thursday test or a
   * quarter test (Sept 24 2026; lib/readingProgress.js).
   *
   * Filed in the attempts table beside everything else she sits, so backups and
   * imports carry it with no new table. Saving it IS what moves her Reading
   * block on: readingToday() reads these rows. It never writes a Khan grade.
   * Read-aloud is saved per answer; on a test it is always false because the
   * test screen has no button.
   */
  async recordReadingWork(form, grade) {
    const isLesson = form.type === 'lesson';
    const attempt = {
      attemptId: newEntryId(),
      testId: form.testId,
      kind: form.kind,
      title: form.title,
      attempt: 1,
      module: form.module,
      dayKey: dayKeyOf(),
      at: new Date().toISOString(),
      right: grade.right,
      total: grade.total,
      percent: grade.percent,
      letter: grade.letter,
      unaidedRight: grade.unaidedRight,
      unaidedCount: grade.unaidedCount,
      unaidedPercent: grade.unaidedPercent,
      aloudCount: isLesson ? grade.aloudCount : 0,
      rows: grade.rows.map((r) => ({
        questionId: r.questionId,
        passage: r.passage,
        chosen: r.chosen,
        answer: r.answer,
        correct: r.correct,
        skipped: r.skipped,
        readAloud: isLesson ? r.readAloud : false
      }))
    };
    await putAttempt(attempt);
    set({ attempts: [...get().attempts, attempt] });

    await get().recordItemEvents(
      attempt.rows.map((r) => ({
        questionId: r.questionId,
        evidenceSource: isLesson ? 'instruction' : 'test',
        attemptState: r.skipped ? 'abandoned' : 'complete',
        correct: r.correct,
        chosen: r.chosen,
        readAloud: r.readAloud
      }))
    );

    // Petals for doing it, never for the score (the reading check's rule).
    await get().addLedgerEntry(
      makeEntry({
        currency: 'petal',
        amount: isLesson ? PETALS.lessonRead : form.type === 'quarter' ? PETALS.quarterTest : PETALS.unitTest,
        kind: 'grant',
        source: isLesson ? 'lesson-read' : 'test-taken',
        note: `Reading: ${form.title}`
      })
    );
    return attempt;
  },

  async recordAttempt(form, responses, grade) {
    const attempt = {
      attemptId: newEntryId(),
      testId: form.testId,
      kind: form.kind,
      title: form.title,
      attempt: form.attempt,
      dayKey: dayKeyOf(),
      at: new Date().toISOString(),
      right: grade.right,
      total: grade.total,
      fraction: grade.fraction,
      percent: grade.percent,
      bandId: grade.band.id,
      revisit: grade.revisit,
      // Question by question. The whole point.
      rows: grade.rows.map((r) => ({
        questionId: r.questionId,
        lesson: r.lesson,
        chosen: r.chosen,
        answer: r.answer,
        correct: r.correct,
        skipped: r.skipped
      }))
    };
    await putAttempt(attempt);
    set({ attempts: [...get().attempts, attempt] });

    await get().recordItemEvents(
      grade.rows.map((r) => ({
        questionId: r.questionId,
        lessonId: r.lesson,
        evidenceSource: 'test',
        // A question she never reached is not a question she got wrong.
        attemptState: r.skipped ? 'abandoned' : 'complete',
        correct: r.correct,
        chosen: r.chosen
      }))
    );

    await get().recordReview(
      grade.rows.map((r) => ({ questionId: r.questionId, correct: r.correct })),
      form.kind === 'quarter' ? 'quarter-test' : 'unit-test'
    );

    // Petals for SITTING it. Never for the score — she has to be able to walk
    // into a test she might fail without it costing her anything.
    await get().addLedgerEntry(
      makeEntry({
        currency: 'petal',
        amount: form.kind === 'quarter' ? PETALS.quarterTest : PETALS.unitTest,
        kind: 'grant',
        source: 'test-taken',
        note: `Sat ${form.title}`
      })
    );
    // Golden seeds for sitting it too — new at v3.12. Doing school used to earn
    // no seeds at all, which made the currency that buys real rewards
    // unreachable by the activity the app is for.
    await get().addLedgerEntry(
      makeEntry({
        currency: 'seed',
        amount: form.kind === 'quarter' ? SEEDS.quarterTest : SEEDS.weeklyTest,
        kind: 'grant',
        source: 'test-taken',
        note: `Sat ${form.title}`
      })
    );
    return attempt;
  },

  /** Warm-up done. Petals for showing up, and the boxes move. */
  async recordWarmUp(results) {
    // THE ROW THE WARM-UP NEVER WROTE. Before v3.56 the only trace of three
    // questions a morning was a Leitner box moving.
    await get().recordItemEvents(
      (results || []).map((r) => ({
        questionId: r.questionId,
        evidenceSource: 'review',
        correct: r.correct,
        chosen: r.chosen,
        attemptNumber: r.attemptNumber
      }))
    );
    await get().recordReview(results, 'warm-up');
    await get().addLedgerEntry(
      makeEntry({
        currency: 'petal',
        amount: PETALS.warmUp,
        kind: 'grant',
        source: 'warm-up',
        note: 'Morning warm-up'
      })
    );
    const today = dayKeyOf();
    await writeMeta('lastWarmUpDay', today);
    set({ lastWarmUpDay: today });
  },

  // -------------------------------------------------------------------------
  // GOALS — §3.11. Added v3.58.
  //
  // ENGINE PROPOSES, ADULT APPROVES. §3.11.5, and §3.10.9's rule that a
  // placement must never be "produced" without an adult seeing it applies here
  // for the same reason: a target nobody chose is a target nobody owns.
  // Nothing below activates a goal on its own.
  // -------------------------------------------------------------------------

  /** What the app would suggest, given where she actually is. Saves nothing. */
  proposedGoals(targetLevel = 5, byDayKey = END_OF_SUMMER) {
    return proposeGrowthGoals({
      strands: get().strands,
      targetLevel,
      fromDayKey: dayKeyOf(),
      byDayKey
    });
  },

  /**
   * Approve one. THIS is where a goal starts existing.
   *
   * Two things it refuses to do:
   *
   * 1. NO BASELINE, NO GOAL. §3.11.3 — "a target with no baseline is a wish",
   *    and validation must reject creation without one.
   *
   * 2. NOT ON A STRAND STILL BEING MEASURED. Grammar's 2.20 rests on four
   *    questions; geometry moved 2.00 -> 2.70 the moment easier items existed.
   *    Setting a target from a number like that and reporting a miss against it
   *    next July is not a measurement, it is an accusation.
   */
  async approveGoal(proposal, { termId = SCHOOL_YEAR.termId } = {}) {
    if (!proposal?.strandId) return { ok: false, reason: 'no-strand' };
    if (typeof proposal?.baseline?.value !== 'number') return { ok: false, reason: 'no-baseline' };
    if (proposal.blockedReason) return { ok: false, reason: 'still-measuring', detail: proposal.blockedReason };

    const now = new Date().toISOString();
    const row = {
      goalId: newEntryId(),
      strandId: proposal.strandId,
      type: proposal.type || 'growth',
      metric: proposal.metric || 'benchmarkScore',
      instrumentId: proposal.instrumentId,
      // Copied at creation and NEVER recomputed. A goal whose starting line
      // moves cannot be missed or met — it can only report whatever just
      // happened.
      baseline: { ...proposal.baseline, capturedOn: now },
      target: { ...proposal.target },
      feasibility: proposal.feasibility,
      termId,
      status: 'active',
      createdBy: 'engine',
      approvedBy: 'guardian',
      visibility: 'both',
      onMiss: 'carry',
      reviewNote: null,
      createdAt: now,
      updatedAt: now
    };
    await putGoal(row);
    set({ goals: [...get().goals, row] });
    return { ok: true, goal: row };
  },

  /** Where she is now, against every goal that is live. */
  goalStatus() {
    const strands = get().strands;
    return get()
      .goals.filter((g) => g.status === 'active')
      .map((g) => ({ goal: g, progress: goalProgress(g, strands) }));
  },

  /**
   * Close one out. §3.11.5 — a missed goal is CARRIED, RESCOPED or RETIRED
   * with a written reason, never silently dropped.
   */
  async reviewGoal(goalId, outcome, reviewNote) {
    const g = get().goals.find((x) => x.goalId === goalId);
    if (!g) return { ok: false, reason: 'no-goal' };
    if (!['met', 'partial', 'missed', 'carried', 'retired'].includes(outcome)) {
      return { ok: false, reason: 'bad-outcome' };
    }
    if (!reviewNote || !String(reviewNote).trim()) return { ok: false, reason: 'no-reason' };
    const row = { ...g, status: outcome, reviewNote: String(reviewNote).trim(), updatedAt: new Date().toISOString() };
    await putGoal(row);
    set({ goals: get().goals.map((x) => (x.goalId === goalId ? row : x)) });
    return { ok: true, goal: row };
  },

  /** Every attempt, grouped by which test it was. */
  attemptsByTest() {
    const out = {};
    for (const a of get().attempts) {
      (out[a.testId] ||= []).push(a);
    }
    for (const list of Object.values(out)) list.sort((a, b) => (a.at < b.at ? -1 : 1));
    return out;
  },

  /** The lesson ids she has opened. */
  lessonsRead() {
    return Object.keys(get().lessonReads);
  },

  /**
   * Lessons she finished without clearing the practice gate.
   *
   * Surfaced as a nudge on the unit-test card and in the Gradebook — NOT as a
   * lock. Her brother's gate serves more practice inside the lesson and does
   * not bar the test either; barring it would trap a nine-year-old behind a
   * wall, and a child who cannot get past a wall stops opening the app.
   */
  shakyLessons() {
    return Object.values(get().lessonReads)
      .filter((r) => r.practice && r.practice.passed === false)
      .map((r) => r.lessonId);
  },

  /**
   * Which questions she is allowed to be asked in a warm-up.
   *
   * Only questions from lessons she has actually read. A warm-up that quizzes
   * her on Thursday's lesson on Tuesday is not spaced review, it is an ambush,
   * and it teaches her that the warm-up is something to dread.
   */
  eligibleQuestionIds() {
    return itemsForLessons(get().lessonsRead()).map((q) => q.id);
  },

  /**
   * The RETRIEVE beat for one lesson — §3.2's ladder opener.
   *
   * Returns question ids from lessons she has ALREADY READ IN THIS COURSE, so
   * the first thing a lesson does is pull back the material it is about to
   * build on.
   *
   * ---- IT RETURNS [] MORE OFTEN THAN YOU WOULD THINK, AND THAT IS RIGHT ----
   *
   * On the first lesson of a course there is nothing taught to pull back, and
   * on the second there may be one question. `minimumPool` sends both to
   * nothing rather than to a thin routine. An app that opens every lesson with
   * a ritual whether or not it has anything to ask is performing, and a child
   * reads that faster than an adult does.
   *
   * ---- WHAT IS EXCLUDED, AND WHY EACH ONE ----
   *
   *   this lesson's own questions — she has not been taught it yet
   *   today's answers        — or the doorway rehearses her for a test she sits
   *                            this afternoon, and inflates a recorded score
   */
  lessonRetrieveFor(lessonId) {
    if (!lessonId) return [];
    const course = courseOfLesson(lessonId);
    if (!course) return [];

    const readInCourse = get()
      .lessonsRead()
      .filter((id) => id !== lessonId && courseOfLesson(id) === course);
    if (readInCourse.length === 0) return [];

    const pool = itemsForLessons(readInCourse).map((q) => q.id);
    const exclude = [
      ...itemsForLessons([lessonId]).map((q) => q.id),
      ...get().answeredTodayIds()
    ];

    // The all-or-nothing rule lives in pickLessonRetrieve, not here — rule 13,
    // so check-assessment can call it rather than grep for it.
    return pickLessonRetrieve(
      get().reviewItems,
      dayKeyOf(),
      pool,
      exclude,
      LESSON_RETRIEVE.questions,
      LESSON_RETRIEVE.minimumPool
    );
  },

  /**
   * This morning's warm-up. Empty when she has already done it today.
   *
   * Sept 23 2026, Gigi: five a morning while more than 30 cards are overdue,
   * then three. The rule is warmUpSize() in lib/morningCircle.js, where
   * check-morning-circle can call it. WARM_UP.questions (3) stays the normal size.
   */
  warmUpToday() {
    if (get().lastWarmUpDay === dayKeyOf()) return [];
    const size = warmUpSize(get().reviewDueCount());
    return pickWarmUp(get().reviewItems, dayKeyOf(), get().eligibleQuestionIds(), size);
  },

  /**
   * Questions she has already answered today, anywhere.
   *
   * Passed into every test build so a question from this morning's warm-up
   * cannot turn up again in this afternoon's test — which would both rehearse
   * her for it and inflate the score that goes in the record. See withoutToday
   * in lib/assessmentEngine.js; simulate-year.mjs found it happening.
   */
  answeredTodayIds() {
    const today = dayKeyOf();
    return Object.values(get().reviewItems)
      .filter((it) => it.lastSeen === today)
      .map((it) => it.questionId);
  },

  /** How much is due today, for the Grown-Up Corner. Never shown to her. */
  reviewDueCount() {
    const eligible = new Set(get().eligibleQuestionIds());
    return dueItems(get().reviewItems, dayKeyOf()).filter((it) => eligible.has(it.questionId)).length;
  },

  /**
   * Re-open one strand for re-measuring, leaving everything else alone.
   *
   * WHY THIS EXISTS. Four of Azianna's nine strands came back pinned at the
   * floor — not because she could not do the work, but because the item bank
   * had nothing easy enough to find out (see data/diagnostic/foundationItems.js).
   * The easy band exists now, so those four need re-measuring — and the only
   * tool available was "reset everything", which would also have thrown away
   * the five strands that were measured perfectly well.
   *
   * Wiping good data to fix bad data is not a repair. This re-opens exactly one
   * strand: its level goes back to the start and the Check-In will pick it up
   * again because it is no longer settled. Its SEEN-ITEMS LIST SURVIVES, so the
   * re-take is a different paper. See reopenStrandState() in the engine for why
   * that list used to be cleared and why clearing it was wrong.
   *
   * Her ANSWER HISTORY is untouched. The old attempt stays in the record, which
   * is the honest thing to do — a re-take should be visible as a re-take.
   */
  async reopenStrand(strandId) {
    if (!STRAND_IDS.includes(strandId)) return;
    const prev = get().strands[strandId] || initialStrandState(strandId);
    // reopenStrandState, NOT initialStrandState. That difference IS the fix: it
    // carries seenItemIds forward so the re-take cannot serve the same paper.
    // simulate-diagnostic.mjs reads this file as text and fails if this line
    // ever goes back to calling initialStrandState directly.
    const fresh = reopenStrandState(prev);
    await writeStrandState(fresh);
    set({ strands: { ...get().strands, [strandId]: fresh } });
  },

  /** Strands whose result cannot be trusted because the bank had no question
   *  easy enough. Surfaced in the Grown-Up Corner so a grown-up is told, rather
   *  than having to notice a suspicious 2.00 on their own. */
  strandsPinnedAtFloor() {
    const out = [];
    for (const id of STRAND_IDS) {
      const st = get().strands[id];
      // The rule itself lives in the engine as isPinnedAtFloor() so it can be
      // tested — simulate-diagnostic.mjs asserts both directions of it. Do not
      // reinline it here; that is where it went wrong the first time.
      if (isPinnedAtFloor(st, itemsForStrand(id))) {
        out.push({ strandId: id, level: st.level, correct: st.correct, asked: st.asked });
      }
    }
    return out;
  },

  /**
   * Floored strands whose RE-MEASURE HAS NOW BEEN EARNED.
   *
   * Gigi declined a re-take on Aug 13 because school had started and Azianna was
   * behind — the right call, and it cost nothing, because a ceiling cannot
   * misplace her. What was wrong was that the decision went into the plan as
   * permanent, with nothing that would ever raise it again.
   *
   * This is the way back. The trigger is an EVENT, not a date: once she has read
   * the Human Body modules that teach the thing the test could not measure, the
   * teaching has happened and re-measuring costs no school days. The rule lives
   * in the engine as reDiagnosticDue() so a check can drive it; this only feeds
   * it her progress.
   */
  reDiagnosticsDue() {
    const read = Object.keys(get().lessonReads || {});
    const out = [];
    for (const id of STRAND_IDS) {
      const r = reDiagnosticDue(id, get().strands[id], itemsForStrand(id), read, HUMANBODY_MODULES);
      if (r && (r.due || r.broken)) out.push({ strandId: id, ...r });
    }
    return out;
  },

  pendingRequests() {
    return get().requests.filter((r) => r.status === 'pending');
  },

  /**
   * How many questions in each strand were read aloud.
   *
   * Only meaningful for the parent. On a maths or science strand this is good
   * news — it means the reading load was removed and the number is cleaner. On
   * Reading Comprehension or Vocabulary it means the level is a LISTENING
   * estimate, and the report says so rather than letting a parent read it as a
   * reading level.
   */
  readAloudByStrand() {
    const out = {};
    for (const a of get().answers) {
      if (!out[a.strandId]) out[a.strandId] = { total: 0, readAloud: 0 };
      out[a.strandId].total += 1;
      if (a.readAloud) out[a.strandId].readAloud += 1;
    }
    return out;
  },

  // -------------------------------------------------------------------------
  // Derived — computed, never stored, so they cannot go stale
  // -------------------------------------------------------------------------

  progress() {
    return diagnosticProgress(get().strands);
  },

  totalAnswered() {
    return get().answers.length;
  },

  strandsSettled() {
    return STRAND_IDS.filter((id) => get().strands[id]?.settled).length;
  },

  rank() {
    return getCurrentRank(get().totalAnswered(), get().strandsSettled());
  },

  sittingComplete() {
    return get().sittingAnswered >= SITTING_LENGTH;
  },

  /** Accuracy across everything answered. Shown to the parent only. */
  overallAccuracy() {
    const a = get().answers;
    if (a.length === 0) return null;
    return a.filter((x) => x.correct).length / a.length;
  },

  strandList() {
    return STRANDS.map((s) => ({ ...s, state: get().strands[s.id] }));
  }
}));

export { db };
