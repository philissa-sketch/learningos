// The one place the diagnostic asks "what questions exist?". Everything else
// goes through itemsForStrand() so no screen ever has to know that maths is
// generated and reading is hand-written.

import { mathItems } from './mathItems.js';
import { elaItems } from './elaItems.js';
import { foundationItems } from './foundationItems.js';
import { STRAND_IDS } from '../../config/strands.js';

// scienceItems.js is deliberately NOT imported. Those 36 questions are parked
// for the Herbalism & Botany course, where the material will have been taught
// before it is measured. Importing them here would re-add three strands the
// diagnostic was told not to test — and index.js throws on an unknown strand,
// so that mistake fails loudly rather than quietly.
// foundationItems are the easy band (roughly 1.5 to 2.2). They were added after
// a real child's results came back with four strands pinned at the floor —
// not because she could not do the work, but because the bank had no question
// easy enough to find out. See foundationItems.js for the full transcript of
// how that failure looked from the inside.
export const allItems = [...mathItems, ...elaItems, ...foundationItems];

const byStrand = {};
for (const id of STRAND_IDS) byStrand[id] = [];
for (const item of allItems) {
  if (!byStrand[item.strand]) {
    // A typo in a strand id would otherwise vanish silently and that strand
    // would quietly have no questions. Loud is better.
    throw new Error(`Item ${item.id} has unknown strand "${item.strand}"`);
  }
  byStrand[item.strand].push(item);
}
// Sorted by level so the bank is readable when debugging and so chooseItem's
// tie-break order is stable.
for (const id of STRAND_IDS) byStrand[id].sort((a, b) => a.level - b.level);

export function itemsForStrand(strandId) {
  return byStrand[strandId] || [];
}

export function getItem(itemId) {
  return allItems.find((i) => i.id === itemId) || null;
}

export function bankSummary() {
  return STRAND_IDS.map((id) => {
    const items = byStrand[id];
    return {
      strand: id,
      count: items.length,
      minLevel: items.length ? items[0].level : null,
      maxLevel: items.length ? items[items.length - 1].level : null
    };
  });
}
