// ---------------------------------------------------------------------------
// GEORGIA STANDARDS OF EXCELLENCE — FOURTH GRADE SOCIAL STUDIES
//
// Transcribed verbatim from the Georgia Department of Education's published
// K-12 Social Studies standards, Aug 17 2026, read from a gadoe.org address.
// Same treatment given to Science in georgiaScience4.js on Aug 14, and for the
// same reason: a course built against my idea of fourth-grade social studies is
// a course nobody can defend to a records office.
//
// THIRTEEN standards. THIRTY-FIVE lettered elements. THIRTY-SEVEN teachable
// units, and the difference between those last two numbers matters — see below.
//
// ---- ⚠️ THIS FILE DID NOT EXIST UNTIL v3.32, AND TWO PLACES SAID IT DID ----
//
// From v3.22 to v3.31, curriculumPlan.js carried the note: "Already built
// against Georgia GSE Social Studies, verbatim — 13 standards, 37 elements. The
// standards work is done; the lessons are not." georgiaScience4.js's own header
// said the same treatment "already given to Social Studies in georgiaSS4.js".
//
// Neither was true. src/data/standards/ held exactly one file, and
// check-standards.mjs only ever imported GA_SCIENCE_4 — WHICH IS WHY NOTHING
// EVER TESTED THE CLAIM. A subject with no standards file and no check reading
// it can assert anything about itself for nine versions.
//
// check-standards now reads BOTH subjects. The claim cannot drift again.
//
// ---- WHAT THE PRIMARY SOURCE SETTLED, AND WHAT IT CORRECTED ----
//
// The old note said 13 standards and 37 elements. A county reproduction of the
// GSE document, read Aug 16, was summarised as 12 standards and 35 elements.
// BOTH secondary readings were wrong in part, and the document settles it:
//
//   * THIRTEEN standards is RIGHT.  SS4H1-H6 (6) + SS4G1-G2 (2)
//     + SS4CG1-CG3 (3) + SS4E1-E2 (2) = 13. The "12" was a miscount of a
//     reproduction, and it is written down here rather than quietly dropped.
//
//   * THIRTY-FIVE LETTERED elements is RIGHT.  19 History + 4 Geography
//     + 6 Civics + 6 Economics = 35.
//
//   * AND THE "37" WAS NOT NONSENSE. TWO STANDARDS CARRY NO LETTERS AT ALL:
//     SS4CG2 (First Amendment freedoms) and SS4E2 (personal budget). They are
//     single undivided requirements. 35 lettered + 2 whole = 37 things that
//     have to be taught and owned.
//
// ---- THE OWNERSHIP MODEL, AND WHY IT DIFFERS FROM SCIENCE ----
//
// Every one of Georgia's 25 science elements is lettered, so the science
// crosswalk owns ELEMENTS and nothing else. Social studies cannot work that
// way: owning only lettered elements would leave SS4CG2 and SS4E2 owned by
// nobody, taught by nobody, and INVISIBLE TO THE CHECK — a gap of exactly the
// shape this whole file exists to prevent.
//
// So `allElements()` below emits 37 ownable units. A standard with letters
// contributes its lettered elements; a standard WITHOUT letters contributes
// ITSELF, under its own code, with `wholeStandard: true` so the difference is
// readable rather than disguised.
//
// ---- WHAT THIS SUBJECT ASKS OF THE BLACK-AMERICAN-EDUCATOR RULE ----
//
// The standing rule is that Black American educators are actively sought and
// every failed search is written down. On The Science Lab it came up 0 of 48
// across 33 searches, in a field dominated by a few large animation channels.
//
// This subject is not that field, and the standards themselves say so:
// SS4H1b names Black regiments. SS4H4a is Frederick Douglass, Sojourner Truth
// and Harriet Tubman. SS4H6c is sharecropping and the prevention of newly won
// rights. SS4H6d is Jim Crow. These are not lessons where the requirement is a
// nice-to-have, and a search that comes up empty on THESE is a search that was
// not run properly.
//
// Source: Social Studies Georgia Standards of Excellence, Grade 4 (GaDOE).
// ---------------------------------------------------------------------------

export const GA_SOCIAL_4 = [
  // ---- HISTORICAL UNDERSTANDINGS ----
  {
    code: 'SS4H1',
    domain: 'Historical Understandings',
    text: 'Explain the causes, events, and results of the American Revolution.',
    elements: [
      {
        code: 'SS4H1a',
        text: 'Trace the events that shaped the revolutionary movement in America: French and Indian War, 1765 Stamp Act, the slogan "no taxation without representation," the activities of the Sons of Liberty, the activities of the Daughters of Liberty, Boston Massacre, and the Boston Tea Party.'
      },
      {
        code: 'SS4H1b',
        text: 'Describe the influence of key individuals and groups during the American Revolution: King George III, George Washington, Benjamin Franklin, Thomas Jefferson, Benedict Arnold, Patrick Henry, John Adams, Paul Revere, and Black regiments.'
      },
      {
        code: 'SS4H1c',
        text: 'Describe the major events of the American Revolution and explain the factors leading to American victory and British defeat; include the Battles of Lexington and Concord, Saratoga, and Yorktown.'
      },
      {
        code: 'SS4H1d',
        text: 'Explain the writing of the Declaration of Independence; include who wrote it, how it was written, why it was necessary, and how it was a response to tyranny and the abuse of power.'
      }
    ]
  },
  {
    code: 'SS4H2',
    domain: 'Historical Understandings',
    text: 'Analyze the challenges faced by the framers of the Constitution.',
    elements: [
      {
        code: 'SS4H2a',
        text: 'Identify the major leaders of the Constitutional Convention (James Madison, George Washington, and Benjamin Franklin).'
      },
      {
        code: 'SS4H2b',
        text: 'Evaluate the major issues debated at the Constitutional Convention: the weaknesses of the Articles of Confederation, the rights of states to govern themselves (federal system), the Great Compromise, and slavery (Three-Fifths Compromise).'
      }
    ]
  },
  {
    code: 'SS4H3',
    domain: 'Historical Understandings',
    text: 'Explain westward expansion in America.',
    elements: [
      {
        code: 'SS4H3a',
        text: 'Describe the causes and events of the War of 1812; include the burning of the Capitol and the White House and the writing of "The Star Spangled Banner."'
      },
      {
        code: 'SS4H3b',
        text: 'Describe the impact of westward expansion on American Indians; include the Trail of Tears, Battle of Little Bighorn and the forced relocation of American Indians to reservations.'
      },
      {
        code: 'SS4H3c',
        text: 'Describe territorial expansion with emphasis on the Louisiana Purchase, the Lewis and Clark expedition, and the acquisitions of Texas (the Alamo and independence), Oregon (Oregon Trail), and California (Gold Rush and the development of mining towns).'
      }
    ]
  },
  {
    code: 'SS4H4',
    domain: 'Historical Understandings',
    text: 'Examine the main ideas of the abolitionist and suffrage movements.',
    elements: [
      {
        code: 'SS4H4a',
        text: 'Discuss contributions of and challenges faced by Susan B. Anthony, Frederick Douglass, Elizabeth Cady Stanton, Sojourner Truth, and Harriet Tubman.'
      }
    ]
  },
  {
    code: 'SS4H5',
    domain: 'Historical Understandings',
    text: 'Explain the causes, major events, and consequences of the Civil War.',
    elements: [
      {
        code: 'SS4H5a',
        text: "Identify Uncle Tom's Cabin and John Brown's raid on Harper's Ferry and explain how each of these events was related to the Civil War."
      },
      {
        code: 'SS4H5b',
        text: "Discuss how the issues of states' rights and slavery increased tensions between the North and South."
      },
      {
        code: 'SS4H5c',
        text: "Identify major battles, campaigns, and events: Fort Sumter, Gettysburg, the Atlanta Campaign, Sherman's March to the Sea, and Appomattox Court House."
      },
      {
        code: 'SS4H5d',
        text: 'Describe the roles of Abraham Lincoln, Robert E. Lee, Ulysses S. Grant, Jefferson Davis, Thomas "Stonewall" Jackson, and William T. Sherman.'
      },
      {
        code: 'SS4H5e',
        text: 'Describe the effects of war on the North and South.'
      }
    ]
  },
  {
    code: 'SS4H6',
    domain: 'Historical Understandings',
    text: 'Analyze the effects of Reconstruction on American life.',
    elements: [
      {
        code: 'SS4H6a',
        text: 'Describe the purpose of the 13th, 14th, and 15th Amendments.'
      },
      {
        code: 'SS4H6b',
        text: "Explain the work of the Bureau of Refugees, Freedmen, and Abandoned Lands (Freedmen's Bureau)."
      },
      {
        code: 'SS4H6c',
        text: 'Explain how slavery was replaced by sharecropping and how freed African Americans or Blacks were prevented from exercising their newly won rights.'
      },
      {
        code: 'SS4H6d',
        text: 'Describe the effects of Jim Crow laws and practices.'
      }
    ]
  },

  // ---- GEOGRAPHIC UNDERSTANDINGS ----
  {
    code: 'SS4G1',
    domain: 'Geographic Understandings',
    text: 'Locate important physical and man-made features in the United States.',
    elements: [
      {
        code: 'SS4G1a',
        text: 'Locate major physical features of the United States: the Atlantic Coastal Plain, the Great Plains, the Continental Divide, the Gulf of Mexico, the Mississippi River, and the Great Lakes.'
      },
      {
        code: 'SS4G1b',
        text: 'Locate major man-made features of the United States: New York City, NY; Boston, MA; Philadelphia, PA; Washington, D.C.; Gettysburg, PA; and the Erie Canal.'
      }
    ]
  },
  {
    code: 'SS4G2',
    domain: 'Geographic Understandings',
    text: 'Describe how physical systems affect human systems.',
    elements: [
      {
        code: 'SS4G2a',
        text: 'Explain how each force (American and British) attempted to use the physical geography of each battle site (Lexington and Concord, Saratoga, and Yorktown) to its benefit.'
      },
      {
        code: 'SS4G2b',
        text: 'Describe physical barriers that hindered and physical gateways that benefited territorial expansion from 1801 to 1861.'
      }
    ]
  },

  // ---- GOVERNMENT/CIVIC UNDERSTANDINGS ----
  {
    code: 'SS4CG1',
    domain: 'Government/Civic Understandings',
    text: 'Describe the meaning of:',
    elements: [
      {
        code: 'SS4CG1a',
        text: 'Natural rights as found in the Declaration of Independence (the right to life, liberty, and the pursuit of happiness)'
      },
      {
        code: 'SS4CG1b',
        text: '"We the People" from the Preamble to the U.S. Constitution as a reflection of consent of the governed or popular sovereignty'
      },
      {
        code: 'SS4CG1c',
        text: 'The federal system of government in the U.S. (federal powers, state powers, and shared powers)'
      },
      {
        code: 'SS4CG1d',
        text: 'Representative democracy/republic'
      }
    ]
  },
  {
    // NO LETTERED ELEMENTS. One undivided requirement — see the header.
    code: 'SS4CG2',
    domain: 'Government/Civic Understandings',
    text: 'Explain the importance of freedoms guaranteed by the First Amendment to the U.S. Constitution.',
    elements: []
  },
  {
    code: 'SS4CG3',
    domain: 'Government/Civic Understandings',
    text: 'Describe the structure of government and the Bill of Rights.',
    elements: [
      {
        code: 'SS4CG3a',
        text: 'Describe how the three branches of government interact with each other (checks and balances and separation of powers), and how they relate to local, state, and federal government.'
      },
      {
        code: 'SS4CG3b',
        text: 'Identify and explain the rights in the Bill of Rights, describe how the Bill of Rights places limits on the powers of government, and explain the reasons for its inclusion in the Constitution in 1791.'
      }
    ]
  },

  // ---- ECONOMIC UNDERSTANDINGS ----
  {
    code: 'SS4E1',
    domain: 'Economic Understandings',
    text: 'Use the basic economic concepts of trade, opportunity cost, specialization, voluntary exchange, productivity, and price incentives to illustrate historical events.',
    elements: [
      {
        code: 'SS4E1a',
        text: 'Describe opportunity cost and its relationship to decision-making across time (e.g., decisions to settle in the west).'
      },
      {
        code: 'SS4E1b',
        text: "Explain how price incentives affect people's behavior and choices: decisions about what crops (e.g., cotton, and tobacco) to grow and products (e.g., textiles) to produce."
      },
      {
        code: 'SS4E1c',
        text: 'Describe how specialization improves standards of living (e.g., differences in the economies in the North and South).'
      },
      {
        code: 'SS4E1d',
        text: 'Explain how voluntary exchange helps both buyers and sellers (e.g., Gold Rush mining towns).'
      },
      {
        code: 'SS4E1e',
        text: 'Describe how trade promotes economic activity (e.g., trade between the U.S. and Europe).'
      },
      {
        code: 'SS4E1f',
        text: 'Give examples of technological advancements and their impact on business productivity during the development of the United States (e.g., cotton gin, steamboat, steam locomotive, and telegraph).'
      }
    ]
  },
  {
    // NO LETTERED ELEMENTS. One undivided requirement — see the header.
    code: 'SS4E2',
    domain: 'Economic Understandings',
    text: 'Identify the elements of a personal budget (income, expenditures, and saving) and explain why personal spending and saving decisions are important.',
    elements: []
  }
];

/**
 * ⚠️ SS4E2 IS NOT SETTLED YET AND THAT IS RECORDED HERE, NOT REMEMBERED.
 *
 * Gigi's own list of what Social Studies should cover named trade, opportunity
 * cost and supply and demand — all of which is SS4E1 — and did not name a
 * personal budget. She was asked whether SS4E2 stays if 48 lessons turns out
 * not to hold all 37 units, and has not answered.
 *
 * It is IN the file because it is in the state's document. If she drops it, it
 * gets moved to a DECLARED omission with her reason attached, the same shape as
 * a declared-empty block — never silently deleted.
 */
export const OPEN_QUESTIONS = [];

/**
 * ✅ ANSWERED Aug 17 2026 — SS4E2 IS OUT.
 *
 * Gigi: "It's out. I'll teach her about money in the 5th grade."
 *
 * It stays IN THIS FILE because it is in Georgia's document and this file is a
 * transcription, not a plan. What changed is the CROSSWALK: SS4E2 has no owner
 * and sits in DECLARED_OMISSIONS in curriculumPlan.js instead, with her words,
 * the date, and who decided. check-standards fails on an unowned unit UNLESS it
 * is declared there, fails if the declaration has no reason, and fails if a
 * declared unit is also owned — a stale declaration is two people disagreeing
 * in writing.
 *
 * Note it was NOT dropped for room. 36 units sit in 48 lessons; there were
 * eleven spare before this and twelve after. It was dropped on its own merits.
 */

/**
 * Secondary readings that disagreed with the document, written down rather than
 * quietly dropped. Same discipline as the four dead Khan addresses.
 */
export const REJECTED_COUNTS = [
  {
    claim: '13 standards, 37 elements',
    source: "curriculumPlan.js's own note, v3.22-v3.31",
    verdict:
      'HALF RIGHT. 13 standards is correct. "37 elements" is correct only if the two letterless standards are counted as units, which is what this file does — but the note asserted it while no standards file existed at all.'
  },
  {
    claim: '12 standards, 35 lettered elements',
    source: 'a county reproduction of the GSE document, read Aug 16 2026',
    verdict:
      'WRONG ON THE STANDARDS. 35 lettered elements is correct; the standard count is 13, not 12. Recorded because it was very nearly used as the planning figure.'
  }
];

/**
 * Every ownable unit, flat. THIRTY-SEVEN of them.
 *
 * A standard with lettered elements contributes those elements. A standard with
 * NONE contributes itself, flagged, so that SS4CG2 and SS4E2 can be owned and
 * checked like everything else instead of falling through the floor.
 */
export function allElements() {
  return GA_SOCIAL_4.flatMap((s) =>
    s.elements.length
      ? s.elements.map((e) => ({
          ...e,
          standard: s.code,
          domain: s.domain,
          standardText: s.text,
          wholeStandard: false
        }))
      : [
          {
            code: s.code,
            text: s.text,
            standard: s.code,
            domain: s.domain,
            standardText: s.text,
            wholeStandard: true
          }
        ]
  );
}

/** The 35 LETTERED elements only, for anything that needs the narrower number. */
export function letteredElements() {
  return allElements().filter((e) => !e.wholeStandard);
}

export function elementByCode(code) {
  return allElements().find((e) => e.code === code) || null;
}

export function standardByCode(code) {
  return GA_SOCIAL_4.find((s) => s.code === code) || null;
}

export const STANDARD_COUNT = GA_SOCIAL_4.length;
export const ELEMENT_COUNT = allElements().length;
export const LETTERED_ELEMENT_COUNT = letteredElements().length;

export default GA_SOCIAL_4;
