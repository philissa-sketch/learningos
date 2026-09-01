// ---------------------------------------------------------------------------
// GEORGIA STANDARDS OF EXCELLENCE — FOURTH GRADE SCIENCE
//
// Transcribed verbatim from the Georgia Department of Education's published
// standards, Aug 14 2026, for the reason that a course built against my idea of
// fourth-grade science is a course nobody can defend to a records office.
//
// ---- ⚠️ THIS HEADER CARRIED A FALSE CLAIM FROM v3.5 TO v3.31 ----
//
// It used to say the "same treatment" had "already been given to Social Studies
// in georgiaSS4.js". THAT FILE DID NOT EXIST. src/data/standards/ held this one
// file alone, and check-standards.mjs imported GA_SCIENCE_4 and nothing else —
// so the claim was never tested by anything.
//
// It was the SECOND copy of the same false claim; the first was in
// curriculumPlan.js's note on the Social Studies course. Two files asserting a
// third file's existence, and no check reading either assertion.
//
// georgiaSS4.js is real as of v3.32 — 13 standards, 35 lettered elements, 37
// ownable units — and check-standards now reads BOTH subjects, so neither
// claim can drift again.
//
// EIGHT standards. TWENTY-FIVE lettered elements.
//
// ---- WHAT THIS DOCUMENT MADE PLAIN, AND IT WAS NOT COMFORTABLE ----
//
// Before this file existed the app taught Herbalism & Botany and The Human
// Body and called them her science. Against the actual document:
//
//   * FIVE of the eight standards are earth, space and physical science —
//     stars and planets, the moon, the water cycle, weather, light, sound,
//     forces and simple machines. A botany course cannot honestly reach most
//     of them, and pretending otherwise is how a crosswalk becomes a fiction.
//
//   * The plant LIFE CYCLE is not a fourth-grade standard at all. It is
//     SECOND grade, S2L1. Plants, habitats and adaptations are THIRD grade,
//     S3L1 and S3L2 — which is most of Herbalism Modules 2, 3 and 4.
//
//   * The Human Body is not a Georgia elementary science standard in fourth
//     grade. Cells and inherited traits appear in FIFTH, S5L. The course she
//     is most excited about carries no state standard, and it is now labeled
//     enrichment rather than quietly counted as science.
//
//   * S4L1 — ecosystems, producers, consumers, decomposers and food webs — is
//     the ONE standard the garden owns completely. It is Herbalism Quarter 1.
//
// ---- THE OWNERSHIP RULE ----
//
// Every one of the 25 elements is owned by EXACTLY ONE course, declared in
// config/curriculumPlan.js. A second course may reinforce an element; only the
// owner is answerable for teaching it. scripts/check-standards.mjs fails the
// build if an element has no owner, has two, or if a quarter that claims to be
// finished has an element with no lesson behind it.
//
// Source: Science Georgia Standards of Excellence, Fourth Grade (GaDOE).
// ---------------------------------------------------------------------------

export const GA_SCIENCE_4 = [
  {
    code: 'S4E1',
    domain: 'Earth and Space Science',
    text: 'Obtain, evaluate, and communicate information to compare and contrast the physical attributes of stars and planets.',
    elements: [
      {
        code: 'S4E1a',
        text: 'Ask questions to compare and contrast technological advances that have changed the amount and type of information on distant objects in the sky.'
      },
      {
        code: 'S4E1b',
        text: "Construct an argument on why some stars (including the Earth's sun) appear to be larger or brighter than others."
      },
      {
        code: 'S4E1c',
        text: 'Construct an explanation of the differences between stars and planets.'
      },
      {
        code: 'S4E1d',
        text: 'Evaluate strengths and limitations of models of our solar system in describing relative size, order, appearance and composition of planets and the sun.'
      }
    ]
  },
  {
    code: 'S4E2',
    domain: 'Earth and Space Science',
    text: 'Obtain, evaluate, and communicate information to model the effects of the position and motion of the Earth and the moon in relation to the sun as observed from the Earth.',
    elements: [
      {
        code: 'S4E2a',
        text: 'Develop a model to support an explanation of why the length of day and night change throughout the year.'
      },
      {
        code: 'S4E2b',
        text: 'Develop a model based on observations to describe the repeating pattern of the phases of the moon (new, crescent, quarter, gibbous, and full).'
      },
      {
        code: 'S4E2c',
        text: "Construct an explanation of how the Earth's orbit, with its consistent tilt, affects seasonal changes."
      }
    ]
  },
  {
    code: 'S4E3',
    domain: 'Earth and Space Science',
    text: 'Obtain, evaluate, and communicate information to demonstrate the water cycle.',
    elements: [
      {
        code: 'S4E3a',
        text: 'Plan and carry out investigations to observe the flow of energy in water as it changes states from solid (ice) to liquid (water) to gas (water vapor).'
      },
      {
        code: 'S4E3b',
        text: 'Develop models to illustrate multiple pathways water may take during the water cycle (evaporation, condensation, and precipitation).'
      }
    ]
  },
  {
    code: 'S4E4',
    domain: 'Earth and Space Science',
    text: 'Obtain, evaluate, and communicate information to predict weather events and infer weather patterns using weather charts/maps and collected weather data.',
    elements: [
      {
        code: 'S4E4a',
        text: 'Construct an explanation of how weather instruments (thermometer, rain gauge, barometer, wind vane, and anemometer) are used in gathering weather data and making forecasts.'
      },
      {
        code: 'S4E4b',
        text: "Interpret data from weather maps, including fronts (warm, cold, and stationary), temperature, pressure, and precipitation to make an informed prediction about tomorrow's weather."
      },
      {
        code: 'S4E4c',
        text: 'Ask questions and use observations of cloud types (cirrus, stratus, and cumulus) and data of weather conditions to predict weather events.'
      },
      {
        code: 'S4E4d',
        text: 'Construct an explanation based on research to communicate the difference between weather and climate.'
      }
    ]
  },
  {
    code: 'S4P1',
    domain: 'Physical Science',
    text: 'Obtain, evaluate, and communicate information about the nature of light and how light interacts with objects.',
    elements: [
      {
        code: 'S4P1a',
        text: 'Plan and carry out investigations to observe and record how light interacts with various materials to classify them as opaque, transparent, or translucent.'
      },
      {
        code: 'S4P1b',
        text: 'Plan and carry out investigations to describe the path light travels from a light source to a mirror and how it is reflected by the mirror using different angles.'
      },
      {
        code: 'S4P1c',
        text: 'Plan and carry out an investigation utilizing everyday materials to explore examples of when light is refracted.'
      }
    ]
  },
  {
    code: 'S4P2',
    domain: 'Physical Science',
    text: 'Obtain, evaluate, and communicate information about how sound is produced and changed and how sound and/or light can be used to communicate.',
    elements: [
      {
        code: 'S4P2a',
        text: 'Plan and carry out an investigation utilizing everyday objects to produce sound and predict the effects of changing the strength or speed of vibrations.'
      },
      {
        code: 'S4P2b',
        text: 'Design and construct a device to communicate across a distance using light and/or sound.'
      }
    ]
  },
  {
    code: 'S4P3',
    domain: 'Physical Science',
    text: 'Obtain, evaluate, and communicate information about the relationship between balanced and unbalanced forces.',
    elements: [
      {
        code: 'S4P3a',
        text: 'Plan and carry out an investigation on the effects of balanced and unbalanced forces on an object and communicate the results.'
      },
      {
        code: 'S4P3b',
        text: 'Construct an argument to support the claim that gravitational force affects the motion of an object.'
      },
      {
        code: 'S4P3c',
        text: 'Ask questions to identify and explain the uses of simple machines (lever, pulley, wedge, inclined plane, wheel and axle, and screw).'
      }
    ]
  },
  {
    code: 'S4L1',
    domain: 'Life Science',
    text: 'Obtain, evaluate, and communicate information about the roles of organisms and the flow of energy within an ecosystem.',
    elements: [
      {
        code: 'S4L1a',
        text: 'Develop a model to describe the roles of producers, consumers, and decomposers in a community.'
      },
      {
        code: 'S4L1b',
        text: 'Develop simple models to illustrate the flow of energy through a food web/food chain beginning with sunlight and including producers, consumers, and decomposers.'
      },
      {
        code: 'S4L1c',
        text: 'Design a scenario to demonstrate the effect of a change on an ecosystem.'
      },
      {
        code: 'S4L1d',
        text: 'Use printed and digital data to develop a model illustrating and describing changes to the flow of energy in an ecosystem when plants or animals become scarce, extinct or overabundant.'
      }
    ]
  }
];

/**
 * The grades these standards are NOT.
 *
 * Recorded because the Herbalism course leans on them heavily and it should be
 * possible to say so out loud rather than discovering it at a records review.
 * These are real Georgia standards, just not fourth-grade ones.
 */
export const OFF_GRADE_NOTES = [
  { code: 'S2L1', grade: 2, note: 'Life cycles of plants and animals. Herbalism Module 1 teaches this.' },
  {
    code: 'S3L1',
    grade: 3,
    note: "Plants, animals and habitats of Georgia's regions; adaptations. Herbalism Modules 2 and 3."
  },
  { code: 'S3L2', grade: 3, note: 'Pollution and human effects on the environment; conservation.' },
  { code: 'S3E1', grade: 3, note: 'Rocks and soils, including soil types and water retention.' },
  { code: 'S5L', grade: 5, note: 'Cells, classification, inherited traits, microorganisms. Nearest thing to The Human Body.' }
];

/** All 25 lettered elements, flat. */
export function allElements() {
  return GA_SCIENCE_4.flatMap((s) =>
    s.elements.map((e) => ({ ...e, standard: s.code, domain: s.domain, standardText: s.text }))
  );
}

export function elementByCode(code) {
  return allElements().find((e) => e.code === code) || null;
}

export function standardByCode(code) {
  return GA_SCIENCE_4.find((s) => s.code === code) || null;
}

export const ELEMENT_COUNT = allElements().length;

export default GA_SCIENCE_4;
