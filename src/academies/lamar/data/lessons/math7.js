// ---------------------------------------------------------------------------
// 7th-grade math lessons — Tier 1 (Junior Engineer).
// Subject-agnostic Lesson Engine consumes this shape; adding a new subject
// later means adding a new file like this one, not touching the engine.
//
// Question types supported by the engine:
//   "choice"  — choices: string[], answer: index (number)
//   "numeric" — answer: number OR string, compared after normalizing
//               (trims whitespace; "1/6" and "0.1667" style answers should
//               use the exact string form students are taught to write)
// ---------------------------------------------------------------------------

export const mathLessons7 = [
  {
    id: 'm7-fractions-1',
    subject: 'math',
    tier: 1,
    title: 'Fuel Tank Fractions',
    theme: 'Adding & subtracting fractions with rocket fuel tanks',
    novaIntro: {
      glossary: {
        oxidizer:
          "A chemical that provides oxygen so a rocket's fuel can burn — needed because there's no air to burn fuel with once a rocket leaves the atmosphere.",
        booster: "A rocket stage that provides extra thrust early in a launch, then detaches (or 'separates') once its fuel is spent."
      },
      beats: [
        {
          label: 'Rewriting Fractions with a Common Denominator',
          teachingText:
            "Fractions with different denominators (the bottom number) can't be compared, added, or subtracted directly — a third can't be measured against a fourth without first putting them on the same scale. A common denominator is a number both original denominators divide into evenly. To rewrite a fraction using a new denominator, multiply both the numerator and denominator by the same number — this doesn't change the fraction's actual value, only how it's written, since multiplying top and bottom by the same number is really just multiplying by a form of 1 (like 2/2 or 3/3).",
          example: 'Rewrite 1/3 using a denominator of 12. Since 3 × 4 = 12, multiply the numerator by 4 too: 1 × 4 = 4. So 1/3 = 4/12.',
          practiceGeneratorId: 'gen-common-denominator-rewrite',
          practiceCount: 4
        },
        {
          label: 'Adding Fractions with Different Denominators',
          teachingText:
            'Once two fractions share the same denominator, adding them means adding just the numerators and keeping that shared denominator — the pieces are now the same size, so they can be combined directly.',
          example: 'Add 1/3 + 1/4. Rewrite both using a shared denominator of 12: 1/3 = 4/12 and 1/4 = 3/12. Now add the numerators: 4/12 + 3/12 = 7/12.',
          practiceGeneratorId: 'gen-fractions-add',
          practiceCount: 4
        },
        {
          label: 'Subtracting Fractions with Different Denominators',
          teachingText:
            "Subtracting works the same way as adding — once both fractions share a denominator, subtract the numerators and keep the denominator. A whole tank (or any whole amount) can be written as a fraction equal to 1 using whatever denominator you need — a full tank is 5/5 if you're working in fifths, or 12/12 if working in twelfths.",
          example: 'A tank has used 2/5, then another 1/5 — that\'s 3/5 total. How much remains? The whole tank is 5/5. Subtract: 5/5 − 3/5 = 2/5 remains.',
          practiceGeneratorId: 'gen-fractions-subtract',
          practiceCount: 4
        }
      ],
      connection:
        "Aerospace engineers work with fuel fractions constantly — a tank might be 3/4 full while a mission plan calls for reserving 1/8 as an emergency margin. Before any calculation about whether there's enough fuel, engineers convert every fraction to a shared denominator so the numbers can be compared, added, or subtracted directly and safely.",
      videoUrl: 'https://www.youtube.com/watch?v=TuId1spuyoc'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "A rocket's main tank is 3/4 full. Launch requires at least 5/8 of a tank. Is there enough fuel?",
        choices: [
          'Yes — 3/4 is greater than 5/8',
          'No — 3/4 is less than 5/8',
          'They are exactly equal',
          'Cannot compare without a calculator'
        ],
        answer: 0,
        explanation:
          '3/4 and 5/8 have different denominators, so first rewrite 3/4 with a denominator of 8: 4×2=8, so 3×2=6, giving 3/4 = 6/8.\n\n' +
          'Now both fractions share the same denominator: 6/8 compared to 5/8. Since 6 is greater than 5, 6/8 is greater than 5/8 — meaning 3/4 is greater than 5/8, so there is enough fuel.\n\n' +
          "Comparing fractions with different denominators only works once both are rewritten using the same denominator — otherwise the numerators aren't measuring pieces of the same size.",
        choiceFeedback: [
          null,
          'It looks like you compared the numerators (3 and 5) directly without converting to a shared denominator first. 3/4 actually equals 6/8, which is greater than 5/8.',
          "3/4 and 5/8 aren't equal — converting 3/4 to eighths gives 6/8, which is different from 5/8.",
          'You can always compare two fractions without a calculator — just rewrite them with a shared denominator, then compare the numerators directly.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Tank A holds 1/3 of the total fuel. Tank B holds 1/4. What fraction of the total fuel is in both tanks combined?',
        choices: ['2/7', '7/12', '1/2', '5/12'],
        answer: 1,
        explanation:
          '1/3 and 1/4 have different denominators, so first rewrite both using a shared denominator of 12: 1/3 = 4/12 (multiply top and bottom by 4), and 1/4 = 3/12 (multiply top and bottom by 3).\n\n' +
          'Now add the numerators: 4/12 + 3/12 = 7/12.\n\n' +
          '7/12 is already in simplest form — 7 and 12 share no common factor besides 1.',
        choiceFeedback: [
          'It looks like you added the numerators and denominators straight across (1+1 over 3+4) — that only works for multiplying, not adding. For adding, both fractions need to share the same denominator first.',
          null,
          '1/2 doesn\'t come from adding 1/3 and 1/4 correctly — try converting both to twelfths first: 1/3 = 4/12 and 1/4 = 3/12, then add the numerators.',
          'Close, but double check the conversions — 1/3 converts to 4/12 (not 3/12), and 1/4 converts to 3/12 (not 2/12). Adding the correct conversions gives 7/12.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt:
          'Engineers used 2/5 of the oxidizer supply during a test, then used another 1/5. What fraction of the oxidizer remains? (Answer as a fraction, like 3/5)',
        answer: '2/5',
        explanation:
          "First add up what's been used: 2/5 + 1/5. These already share the same denominator, so just add the numerators: 2/5 + 1/5 = 3/5.\n\n" +
          'A full supply is the whole amount, written as 5/5. Subtract what\'s used from the whole: 5/5 − 3/5 = 2/5.\n\n' +
          '2/5 is already in simplest form.',
        commonMistakes: {
          '3/5': "That's the amount used, not the amount remaining — subtract it from the full supply (5/5) to find what's left: 5/5 − 3/5 = 2/5.",
          '1/5': 'It looks like only one of the two amounts used (2/5 or 1/5) was subtracted — both amounts need to be added together first, then subtracted from the whole.'
        },
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt:
          'A booster separates once it has burned 5/6 of its fuel. It has burned 2/3 so far. How much more (as a fraction of the tank) must it burn? (Answer as a fraction, like 1/6)',
        answer: '1/6',
        explanation:
          '5/6 and 2/3 have different denominators, so first rewrite 2/3 with a denominator of 6: 3×2=6, so 2×2=4, giving 2/3 = 4/6.\n\n' +
          'Now subtract: 5/6 − 4/6 = 1/6.\n\n' +
          '1/6 is already in simplest form.',
        commonMistakes: {
          '3/3': "It looks like you subtracted the numerators and denominators straight across (5−2 over 6−3) — that's not how subtracting fractions works. Convert 2/3 to sixths first (2/3 = 4/6), then subtract: 5/6 − 4/6 = 1/6.",
          '1/3': "5 − 2 = 3, but the denominators don't subtract the same way — convert 2/3 to sixths (4/6) first, then subtract from 5/6 to get 1/6."
        },
        xp: 10
      },
      {
        id: 'q5',
        type: 'numeric',
        prompt:
          "A fuel reading shows 3/5 full. To compare it with a gauge that reads in twentieths, rewrite 3/5 with a denominator of 20. What's the new numerator? (Answer as a whole number)",
        answer: '12',
        explanation:
          '5 × 4 = 20, so multiply the numerator by the same amount: 3 × 4 = 12. That gives 3/5 = 12/20.\n\n' +
          "Multiplying the top and bottom of a fraction by the same number is really multiplying by 4/4, which equals 1 — so the fraction's actual value never changes, only how it's written.",
        commonMistakes: {
          '18': 'It looks like you added the difference between the denominators instead of multiplying — rewriting a fraction always means multiplying the top and bottom by the same number, never adding.',
          '15': "That doesn't match how the denominator changed — figure out what 5 was multiplied by to reach 20 (that's 4), then multiply the numerator 3 by that same 4."
        },
        xp: 5
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'A payload gauge reads 2/3 full. A fuel gauge reads 7/12 full. Which is fuller?',
        choices: ['2/3 is fuller', '7/12 is fuller', 'They are equal', 'Cannot tell without a calculator'],
        answer: 0,
        explanation:
          '2/3 and 7/12 have different denominators. Rewrite 2/3 with a denominator of 12: 3×4=12, so 2×4=8, giving 2/3 = 8/12.\n\n' +
          'Now compare 8/12 to 7/12 — since 8 is greater than 7, 8/12 is greater, meaning 2/3 is fuller.\n\n' +
          'Comparing only works once both fractions share the same denominator.',
        choiceFeedback: [
          null,
          'It looks like you compared 7 and 12 (or 2 and 3) directly without converting to a shared denominator. Rewriting 2/3 as twelfths gives 8/12, which is greater than 7/12.',
          "They aren't equal — 2/3 converts to 8/12, which is different from 7/12.",
          'You can always compare two fractions without a calculator by rewriting them with a shared denominator first.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'numeric',
        prompt: "A fuel gauge reads 2/5 full. The crew adds 1/4 of a tank's worth. What fraction full is the tank now? (Answer as a fraction, like 3/4)",
        answer: '13/20',
        explanation:
          '2/5 and 1/4 have different denominators, so rewrite both using a shared denominator of 20: 2/5 becomes 8/20, and 1/4 becomes 5/20.\n\n' +
          'Now add the numerators: 8/20 + 5/20 = 13/20.\n\n' +
          '13/20 is already in simplest form — 13 is prime and does not divide evenly into 20.',
        commonMistakes: {
          '3/9': 'It looks like you added the numerators and denominators straight across (2+1 over 5+4) — that only works for multiplying, not adding. Convert both fractions to a shared denominator of 20 first.'
        },
        xp: 10
      },
      {
        id: 'q8',
        type: 'numeric',
        prompt:
          'Tank A holds 3/8 of the total propellant. Tank B holds 1/6. What fraction of the total propellant is in both combined? (Answer as a fraction, like 3/4)',
        answer: '13/24',
        explanation:
          '3/8 and 1/6 have different denominators, so rewrite both using a shared denominator of 48: 3/8 becomes 18/48, and 1/6 becomes 8/48.\n\n' +
          'Add the numerators: 18/48 + 8/48 = 26/48.\n\n' +
          "To find the greatest common factor of 26 and 48: 26's factors are 1, 2, 13, 26. 48's factors are 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. The largest number in both lists is 2, so divide both by 2 to reach 13/24.",
        commonMistakes: {
          '4/14': 'It looks like you added straight across (3+1 over 8+6) instead of converting to a shared denominator first.',
          '26/48': 'You added correctly, but 26/48 can still be simplified — divide both by their greatest common factor (2) to reach 13/24.'
        },
        xp: 10
      },
      {
        id: 'q9',
        type: 'numeric',
        prompt: 'A propellant tank has used 1/3 of its supply, then used another 1/4. What fraction remains? (Answer as a fraction, like 5/12)',
        answer: '5/12',
        explanation:
          "First add up what's used: 1/3 + 1/4. Using a shared denominator of 12: 4/12 + 3/12 = 7/12.\n\n" +
          'A full tank is the whole, written as 12/12. Subtract what\'s used: 12/12 − 7/12 = 5/12.\n\n' +
          '5/12 is already in simplest form.',
        commonMistakes: {
          '7/12': "That's the amount used, not remaining — subtract it from the full tank (12/12) to get 12 − 7 = 5, so 5/12 remains.",
          '11/12': 'Double check adding the used amounts first: 1/3 + 1/4 = 4/12 + 3/12 = 7/12 used, not less.'
        },
        xp: 10
      },
      {
        id: 'q10',
        type: 'numeric',
        prompt:
          'A rocket stage separates once it has burned 7/8 of its fuel. It has burned 3/4 so far. How much more must it burn? (Answer as a fraction, like 1/8)',
        answer: '1/8',
        explanation:
          '7/8 and 3/4 have different denominators, so rewrite 3/4 with a denominator of 8: 4×2=8, so 3×2=6, giving 3/4 = 6/8.\n\n' +
          'Now subtract: 7/8 − 6/8 = 1/8.\n\n' +
          '1/8 is already in simplest form.',
        commonMistakes: {
          '4/4': "It looks like you subtracted the numerators and denominators straight across (7−3 over 8−4) — convert 3/4 to eighths first (6/8), then subtract from 7/8.",
          '1/4': "7 − 3 = 4, but that's not how the denominators work here — convert 3/4 to eighths (6/8) first, then subtract: 7/8 − 6/8 = 1/8."
        },
        xp: 10
      }
    ]
  },
  {
    id: 'm7-fractions-2',
    subject: 'math',
    tier: 1,
    title: 'Thrust & Payload Fractions',
    theme: 'Multiplying fractions for thrust and payload calculations',
    novaIntro: {
      glossary: {
        payload: "The cargo, equipment, or people a rocket or spacecraft carries — separate from the rocket itself.",
        thrust: 'The forward-pushing force an engine produces — the harder an engine pushes, the more thrust it generates.',
        oxidizer:
          "A chemical that provides oxygen so a rocket's fuel can burn — needed because there's no air to burn fuel with once a rocket leaves the atmosphere.",
        burn: "A period of time when a rocket engine is actually firing — not literally catching fire. A rocket might have several separate burns during a mission, each one a planned stretch of engine firing to speed up, slow down, or change direction."
      },
      beats: [
        {
          label: 'Multiplying Two Fractions',
          teachingText:
            "A rocket's payload — the cargo, equipment, or people it carries, separate from the rocket itself — is often stored in a bay that's only partially full, within a section that itself only takes up part of the rocket. To find out what fraction of the whole rocket that represents, multiply the two fractions together: multiply the numerators, multiply the denominators, then simplify. You never need a common denominator to multiply — that's only for adding and subtracting.",
          example:
            "If a payload bay is 3/5 full, within a compartment that takes up 2/3 of the rocket, multiply 3/5 × 2/3 = (3×2)/(5×3) = 6/15, which simplifies to 2/5.",
          practiceGeneratorId: 'gen-payload-fraction-multiply',
          practiceCount: 4
        },
        {
          label: 'Multiplying a Whole Number by a Fraction',
          teachingText:
            "Thrust — the forward-pushing force an engine produces — often needs to be calculated across several identical engines or fuel modules at once. Any whole number can be rewritten as a fraction by putting it over 1 — the number 4 is the same value as 4/1, since dividing by 1 never changes a number. Once it's written that way, multiply it by a fraction the same way you'd multiply any two fractions: numerator × numerator, denominator × denominator.",
          example:
            'If each engine module contributes 5/8 of a ton of thrust-generating fuel, and there are 4 identical modules, rewrite 4 as 4/1: 5/8 × 4/1 = (5×4)/(8×1) = 20/8, which simplifies to 2.5 tons total.',
          practiceGeneratorId: 'gen-thrust-whole-fraction-multiply',
          practiceCount: 4
        }
      ],
      connection:
        "Payload and thrust calculations mix both of these constantly — sometimes you're combining two fractional amounts (like two partially-full sections), and sometimes you're multiplying a fraction by a whole count of identical modules. Knowing which situation you're in, and handling the whole-number case correctly, is exactly what keeps a payload estimate accurate.",
      videoUrl: 'https://www.youtube.com/watch?v=x6xtezhuCZ4'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          "An engine fires at full power for 3/4 of its burn time. The full burn lasts 2/3 of a minute. How long (in minutes) is it at full power?",
        choices: ['1/2', '5/7', '2/3', '3/4'],
        answer: 0,
        explanation:
          '3/4 × 2/3 = (3×2)/(4×3) = 6/12.\n\n' +
          "To find the greatest common factor of 6 and 12: list each number's factors — 6: 1, 2, 3, 6. 12: 1, 2, 3, 4, 6, 12. The largest number in both lists is 6, so divide both 6 and 12 by 6 to reach 1/2.\n\n" +
          "You multiply because you're finding a fraction OF a fraction — full power happens for a portion of a burn that's itself only part of a minute. Multiplying never needs a common denominator (that's only for adding or subtracting two different fractions). Adding would incorrectly combine two separate amounts into something bigger; dividing would tell you how many times one fits into the other, not the actual time spent at full power.",
        choiceFeedback: [
          null,
          "It looks like you added the fractions (3+2 over 4+3 = 5/7) instead of multiplying. For multiplying fractions, multiply straight across: numerator × numerator, denominator × denominator.",
          "2/3 is just the burn's total length — you still need to multiply it by 3/4 to find how long the engine was at full power specifically.",
          "3/4 is just the fraction of the burn spent at full power — you still need to multiply it by the burn's total length, 2/3, to get an actual amount of time."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Each fuel module weighs 5/8 ton. How much do 4 modules weigh, in tons? (Answer as a decimal, like 1.5)',
        answer: '2.5',
        explanation:
          'Any whole number can be rewritten as a fraction by putting it over 1 — 4 is the same value as 4/1. That means 5/8 × 4 is really 5/8 × 4/1.\n\n' +
          '5/8 × 4/1 = (5×4)/(8×1) = 20/8.\n\n' +
          "To find the greatest common factor of 20 and 8: 20's factors are 1, 2, 4, 5, 10, 20. 8's factors are 1, 2, 4, 8. The largest number in both lists is 4, so divide both 20 and 8 by 4 to reach 5/2, which is 2.5.\n\n" +
          'The denominator (8) never changes because we\'re multiplying by 4/1, and multiplying any denominator by 1 leaves it exactly the same — only the numerators multiply together (5×4).',
        commonMistakes: {
          '20': 'You found 5 × 4 = 20 correctly, but forgot to divide by the denominator 8 to finish. 20 ÷ 8 = 2.5.',
          '1.6': 'It looks like you flipped the fraction upside down before multiplying — dividing 8 by 5 instead of multiplying 5/8 by 4.',
          '9': 'It looks like you added 5 and 4 instead of multiplying — multiply the numerator by the whole number instead.'
        },
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          "A payload bay is 3/5 full of equipment. 1/3 of that equipment is removed. What fraction of the bay's total capacity was removed?",
        choices: ['1/5', '3/8', '1/3', '2/5'],
        answer: 0,
        explanation:
          '3/5 × 1/3 = (3×1)/(5×3) = 3/15.\n\n' +
          "To find the greatest common factor of 3 and 15: 3's factors are 1, 3. 15's factors are 1, 3, 5, 15. The largest number in both lists is 3, so divide both 3 and 15 by 3 to reach 1/5.\n\n" +
          "You multiply because this is a fraction OF a fraction — the removed portion is 1/3 of an amount that itself was only 3/5 of the bay's full capacity, not two separate amounts to combine.",
        choiceFeedback: [
          null,
          'It looks like you added the denominators (5+3=8) instead of multiplying them (5×3=15) — for multiplying fractions, multiply straight across.',
          "1/3 is just the fraction of the stored equipment that was removed — you still need to multiply it by 3/5, the fraction of the bay that was full, to get the fraction of the bay's total capacity.",
          "2/5 is what's LEFT in the bay after the removal, not what was removed. The question asks what fraction was removed — that's 3/5 × 1/3."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt:
          "An astronaut's oxygen tank is 9/10 full. A full tank holds 40 liters. How many liters are in the tank right now?",
        answer: '36',
        explanation:
          'Any whole number can be rewritten as a fraction by putting it over 1 — 40 is the same value as 40/1. That means 40 × 9/10 is really 40/1 × 9/10.\n\n' +
          '40/1 × 9/10 = (40×9)/(1×10) = 360/10.\n\n' +
          '360 divides evenly by 10, so no further simplifying is needed beyond that division: 360 ÷ 10 = 36 liters.\n\n' +
          "The denominator (10) stays the same because we're multiplying by 40/1, and multiplying any denominator by 1 leaves it exactly the same — only the numerators multiply together (40×9).",
        commonMistakes: {
          '360': "You multiplied 40 × 9 = 360 correctly, but forgot to divide by 10 to account for the fraction's denominator. 360 ÷ 10 = 36.",
          '4.44': 'It looks like you divided 40 by 9 instead of multiplying 40 by 9/10 — multiply 40 × 9 first, then divide by 10.'
        },
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt:
          "A satellite's solar panel array is 5/6 deployed. Of the deployed portion, 3/4 is generating power at full capacity. What fraction of the total array is generating full power?",
        choices: ['5/8', '4/5', '15/24', '3/4'],
        answer: 0,
        explanation:
          '5/6 × 3/4 = (5×3)/(6×4) = 15/24.\n\n' +
          "To find the greatest common factor of 15 and 24: 15's factors are 1, 3, 5, 15. 24's factors are 1, 2, 3, 4, 6, 8, 12, 24. The largest number in both lists is 3, so divide both 15 and 24 by 3 to reach 5/8.\n\n" +
          "You multiply because this is a fraction OF a fraction — the panels generating full power are 3/4 of an array that's itself only 5/6 deployed, not two separate amounts to combine.",
        choiceFeedback: [
          null,
          'It looks like you added the fractions (5+3 over 6+4 = 8/10, which simplifies to 4/5) instead of multiplying. For multiplying fractions, multiply straight across: numerator × numerator, denominator × denominator.',
          'You multiplied correctly to get 15/24, but that can still be simplified — divide the top and bottom by their greatest common factor (3) to reach 5/8.',
          "3/4 is just the fraction of the deployed portion generating full power — you still need to multiply it by 5/6, the fraction of the array that's deployed at all."
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'numeric',
        prompt:
          "A rover's battery is 7/8 charged. During its next task, it will use 2/3 of that stored charge. What fraction of the battery's full capacity will be used? (Answer as a fraction, like 1/6)",
        answer: '7/12',
        explanation:
          '7/8 × 2/3 = (7×2)/(8×3) = 14/24.\n\n' +
          "To find the greatest common factor of 14 and 24: 14's factors are 1, 2, 7, 14. 24's factors are 1, 2, 3, 4, 6, 8, 12, 24. The largest number in both lists is 2, so divide both 14 and 24 by 2 to reach 7/12.\n\n" +
          "You multiply because this is a fraction OF a fraction — the charge being used is 2/3 of a battery that's itself only 7/8 charged, not two separate amounts to add together.",
        commonMistakes: {
          '9/11': 'It looks like you added the fractions (7+2 over 8+3 = 9/11) instead of multiplying. Multiplying fractions never needs a common denominator — that only applies to adding.',
          '14/24': 'You multiplied correctly, but 14/24 can still be simplified — divide the top and bottom by their greatest common factor (2) to reach 7/12.'
        },
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt:
          "A wind tunnel test uses 4/5 of the tunnel's total airflow capacity. Of that used airflow, 1/2 is directed through the test section. What fraction of the tunnel's total capacity flows through the test section?",
        choices: ['2/5', '5/7', '4/10', '1/2'],
        answer: 0,
        explanation:
          '4/5 × 1/2 = (4×1)/(5×2) = 4/10.\n\n' +
          "To find the greatest common factor of 4 and 10: 4's factors are 1, 2, 4. 10's factors are 1, 2, 5, 10. The largest number in both lists is 2, so divide both 4 and 10 by 2 to reach 2/5.\n\n" +
          "You multiply because this is a fraction OF a fraction — the airflow reaching the test section is 1/2 of the airflow that's already only 4/5 of the tunnel's total capacity.",
        choiceFeedback: [
          null,
          'It looks like you added the fractions (4+1 over 5+2 = 5/7) instead of multiplying. For multiplying fractions, multiply straight across instead.',
          "You multiplied correctly to get 4/10, but that can still be simplified — divide the top and bottom by their greatest common factor (2) to reach 2/5.",
          "1/2 is just the fraction of the used airflow going to the test section — you still need to multiply it by 4/5, the fraction of the tunnel's total capacity that's being used at all."
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'numeric',
        prompt:
          'A satellite dish assembly uses 3/4 of a kilogram of adhesive per panel. How many kilograms of adhesive are needed for 6 identical panels? (Answer as a decimal, like 1.5)',
        answer: '4.5',
        explanation:
          'Any whole number can be rewritten as a fraction by putting it over 1 — 6 is the same value as 6/1. That means 3/4 × 6 is really 3/4 × 6/1.\n\n' +
          '3/4 × 6/1 = (3×6)/(4×1) = 18/4.\n\n' +
          "To find the greatest common factor of 18 and 4: 18's factors are 1, 2, 3, 6, 9, 18. 4's factors are 1, 2, 4. The largest number in both lists is 2, so divide both 18 and 4 by 2 to reach 9/2, which is 4.5.\n\n" +
          "The denominator (4) never changes because we're multiplying by 6/1, and multiplying any denominator by 1 leaves it exactly the same — only the numerators multiply together (3×6).",
        commonMistakes: {
          '18': 'You correctly found 18 as the new numerator, but stopped before dividing by the denominator (4) to get the final amount — 18 ÷ 4 = 4.5.',
          '72': "It looks like you multiplied the denominator too — when multiplying by a whole number, the denominator (4) stays the same, since 6 is really 6/1. Only the numerator (3) gets multiplied by 6."
        },
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt:
          'Each experiment module aboard a space station uses 2/5 of a liter of stored water per day. How many liters do 5 identical modules use per day?',
        choices: ['2', '10', '2.5', '0.4'],
        answer: 0,
        explanation:
          'Any whole number can be rewritten as a fraction by putting it over 1 — 5 is the same value as 5/1. That means 2/5 × 5 is really 2/5 × 5/1.\n\n' +
          '2/5 × 5/1 = (2×5)/(5×1) = 10/5.\n\n' +
          "To find the greatest common factor of 10 and 5: 10's factors are 1, 2, 5, 10. 5's factors are 1, 5. The largest number in both lists is 5, so divide both 10 and 5 by 5 to reach 2/1, which is just 2.\n\n" +
          "The denominator (5) never changes because we're multiplying by 5/1, and multiplying any denominator by 1 leaves it exactly the same — only the numerators multiply together (2×5).",
        choiceFeedback: [
          null,
          'You found 2×5=10 correctly as the new numerator, but forgot to divide by the denominator (5) to finish — 10÷5=2.',
          'It looks like you flipped the fraction upside down before multiplying — dividing 5 by 2 instead of multiplying 2/5 by 5.',
          "0.4 is just 2/5 written as a decimal — you still need to multiply it by 5, the number of identical modules."
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'numeric',
        prompt:
          "A rocket's guidance computer processes 5/6 of a gigabyte of data per second during descent. How many gigabytes does it process in 9 seconds? (Answer as a decimal, like 1.5)",
        answer: '7.5',
        explanation:
          'Any whole number can be rewritten as a fraction by putting it over 1 — 9 is the same value as 9/1. That means 5/6 × 9 is really 5/6 × 9/1.\n\n' +
          '5/6 × 9/1 = (5×9)/(6×1) = 45/6.\n\n' +
          "To find the greatest common factor of 45 and 6: 45's factors are 1, 3, 5, 9, 15, 45. 6's factors are 1, 2, 3, 6. The largest number in both lists is 3, so divide both 45 and 6 by 3 to reach 15/2, which is 7.5.\n\n" +
          "The denominator (6) never changes because we're multiplying by 9/1, and multiplying any denominator by 1 leaves it exactly the same — only the numerators multiply together (5×9).",
        commonMistakes: {
          '45': 'You correctly found 45 as the new numerator, but stopped before dividing by the denominator (6) to get the final amount — 45 ÷ 6 = 7.5.',
          '1.2': 'It looks like you flipped the fraction upside down before multiplying — dividing 6 by 5 instead of multiplying 5/6 by 9.'
        },
        xp: 10
      }
    ]
  },
  {
    id: 'm7-ratios-1',
    subject: 'math',
    tier: 1,
    title: 'Scale Models & Rocket Ratios',
    theme: 'Ratios and proportions using scale models',
    novaIntro: {
      beats: [
        {
          label: 'Scaling with a Scale Factor',
          teachingText:
            'A scale ratio like 1:24 means every real measurement is 24 times larger than its matching measurement on a model — the model shrinks everything by the same factor, in every dimension. To find a real measurement from a model measurement, multiply by the scale factor. To go the other way — finding a model measurement from something real — divide by the scale factor.',
          example: 'A model uses a scale of 1:20. If the model is 3 meters tall, the real object is 3 × 20 = 60 meters tall.',
          practiceGeneratorId: 'gen-scale-factor',
          practiceCount: 4
        },
        {
          label: 'Solving Proportions from a Ratio',
          teachingText:
            "A ratio like 3:2 means for every 3 of the first amount, there are 2 of the second. If you know a ratio and one of the actual amounts, find the matching amount by figuring out what the ratio's known side was scaled up by, then applying that same scaling to the other side.",
          example:
            "A crew has a ratio of 3 engineers to 2 scientists. If there are 15 engineers, that's 15 ÷ 3 = 5 times the ratio's '3'. Apply that same scaling to the '2': 2 × 5 = 10 scientists.",
          practiceGeneratorId: 'gen-ratio-proportion',
          practiceCount: 4
        }
      ],
      connection:
        "Before building a full-size aircraft or rocket, engineers build scale models to test aerodynamics in wind tunnels. Every measurement on that model has to scale consistently, or the test results won't accurately predict how the real thing behaves — and mission crews use the same ratio thinking to scale team sizes, fuel mixtures, and equipment counts up or down safely.",
      videoUrl: 'https://www.youtube.com/watch?v=MaMk6-f3T9k'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A model rocket is built at a scale of 1:24. The model is 8 inches tall. How tall is the real rocket, in inches?',
        answer: '192',
        explanation:
          'A scale of 1:24 means every real measurement is 24 times the matching model measurement.\n\n' +
          'Multiply the model measurement by the scale factor: 8 × 24 = 192.',
        commonMistakes: {
          '32': 'It looks like you added the scale factor instead of multiplying — a scale of 1:24 means multiplying: 8 × 24 = 192.'
        },
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A model rocket is built at a scale of 1:15. The real rocket is 180 inches tall. How tall is the model, in inches?',
        answer: '12',
        explanation:
          'A scale of 1:15 means every real measurement is 15 times the matching model measurement — so going from real to model, divide by the scale factor.\n\n' +
          '180 ÷ 15 = 12.',
        commonMistakes: {
          '2700': 'It looks like you multiplied instead of dividing — going from the real object to the model means dividing by the scale factor: 180 ÷ 15 = 12.'
        },
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: "An engine's fuel-to-oxidizer ratio is 2:5. There are 40 gallons of oxidizer. How many gallons of fuel are needed?",
        answer: '16',
        explanation:
          'The ratio 2:5 means for every 2 gallons of fuel, there are 5 gallons of oxidizer.\n\n' +
          '40 is 8 times 5 (5 × 8 = 40), so the ratio has been scaled up by 8. Apply that same scaling to fuel: 2 × 8 = 16.',
        commonMistakes: {
          '100': 'It looks like you multiplied 40 by 2.5 or a similar guess rather than scaling the ratio directly — 40 ÷ 5 = 8, then 2 × 8 = 16.',
          '40': "That's the amount of oxidizer you were given, not the matching amount of fuel — the ratio 2:5 means fuel is smaller here, not equal."
        },
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A crew has 3 engineers for every 2 scientists. If there are 15 engineers, how many scientists are there?',
        answer: '10',
        explanation:
          'The ratio 3:2 means for every 3 engineers, there are 2 scientists.\n\n' +
          '15 is 5 times 3 (3 × 5 = 15), so the ratio has been scaled up by 5. Apply that same scaling to scientists: 2 × 5 = 10.',
        commonMistakes: {
          '14': "It looks like you added the difference between the ratio numbers instead of scaling — find what 3 was multiplied by to reach 15 (that's 5), then multiply 2 by that same 5."
        },
        xp: 10
      },
      {
        id: 'q5',
        type: 'numeric',
        prompt: "A rocket's propellant-to-total-mass ratio is 5:6. Total mass is 900,000 kg. What is the propellant mass, in kg?",
        answer: '750000',
        explanation:
          "The ratio 5:6 means for every 6 kg of total mass, 5 kg is propellant.\n\n" +
          '900,000 is 150,000 times 6 (6 × 150,000 = 900,000), so multiply propellant\'s side by the same 150,000: 5 × 150,000 = 750,000.',
        commonMistakes: {
          '900000': "That's the total mass, not the propellant mass — propellant is only 5/6 of that total: 5 × 150,000 = 750,000.",
          '150000': "That's the scaling factor itself (how many times bigger 900,000 is than 6), not the answer — multiply propellant's side (5) by that scaling factor: 5 × 150,000 = 750,000."
        },
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: "A scale model uses a ratio of 1:30. The model's height is 4 meters. What is the real height, in meters?",
        choices: ['120', '34', '26', '7.5'],
        answer: 0,
        explanation:
          'A scale of 1:30 means every real measurement is 30 times the matching model measurement.\n\n' +
          'Multiply the model measurement by the scale factor: 4 × 30 = 120.',
        choiceFeedback: [
          null,
          "It looks like you added the scale factor to the model measurement (4 + 30) instead of multiplying — a scale of 1:30 means multiplying: 4 × 30 = 120.",
          "It looks like you subtracted instead of multiplying — a scale of 1:30 means the real height is 30 times the model's, not 30 less: 4 × 30 = 120.",
          'That looks like 30 ÷ 4 — but going from the model to the real object means multiplying the model measurement by the scale factor, not dividing the other way.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'A model plane is built at a scale of 1:18. The real plane is 216 inches long. How long is the model, in inches?',
        choices: ['12', '198', '234', '3888'],
        answer: 0,
        explanation:
          'A scale of 1:18 means every real measurement is 18 times the matching model measurement — so going from real to model, divide by the scale factor.\n\n' +
          '216 ÷ 18 = 12.',
        choiceFeedback: [
          null,
          'It looks like you subtracted the scale factor from the real measurement (216 − 18) instead of dividing — going from real to model means dividing: 216 ÷ 18 = 12.',
          'It looks like you added the scale factor instead of dividing — going from real to model means dividing: 216 ÷ 18 = 12.',
          'It looks like you multiplied instead of dividing — going from the real object to the model means dividing by the scale factor, not multiplying: 216 ÷ 18 = 12.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'numeric',
        prompt: 'A crew has 4 pilots for every 7 engineers. If there are 28 pilots, how many engineers are there?',
        answer: '49',
        explanation:
          'The ratio 4:7 means for every 4 pilots, there are 7 engineers.\n\n' +
          '28 is 7 times 4 (4 × 7 = 28), so the ratio has been scaled up by 7. Apply that same scaling to engineers: 7 × 7 = 49.',
        commonMistakes: {
          '31': "It looks like you added the difference between the ratio numbers instead of scaling — find what 4 was multiplied by to reach 28 (that's 7), then multiply 7 by that same 7."
        },
        xp: 10
      },
      {
        id: 'q9',
        type: 'numeric',
        prompt: "A satellite's solar-to-battery cell ratio is 6:5. There are 30 solar cells. How many battery cells are needed?",
        answer: '25',
        explanation:
          'The ratio 6:5 means for every 6 solar cells, there are 5 battery cells.\n\n' +
          '30 is 5 times 6 (6 × 5 = 30), so the ratio has been scaled up by 5. Apply that same scaling to battery cells: 5 × 5 = 25.',
        commonMistakes: {
          '30': "That's the number of solar cells you were given, not the matching number of battery cells."
        },
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: "A rover's wheel-to-camera ratio is 6:2. If there are 18 wheels, how many cameras are there?",
        choices: ['6', '12', '3', '9'],
        answer: 0,
        explanation:
          'The ratio 6:2 means for every 6 wheels, there are 2 cameras.\n\n' +
          '18 is 3 times 6 (6 × 3 = 18), so the ratio has been scaled up by 3. Apply that same scaling to cameras: 2 × 3 = 6.',
        choiceFeedback: [
          null,
          "It looks like you subtracted (18 − 6) instead of scaling the ratio — find what 6 was multiplied by to reach 18 (that's 3), then multiply 2 by that same 3.",
          "That's the scaling factor itself (how many times bigger 18 is than 6), not the answer — multiply the camera side (2) by that scaling factor: 2 × 3 = 6.",
          "That's 18 ÷ 2, which doesn't match how this ratio scales — find what 6 was multiplied by to reach 18 (that's 3), then multiply 2 by that same 3."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'm7-ratios-2',
    subject: 'math',
    tier: 1,
    title: 'Fuel Consumption Rates',
    theme: 'Unit rates for fuel and distance',
    novaIntro: {
      beats: [
        {
          label: 'Finding a Unit Rate',
          teachingText:
            'A rate is a ratio comparing two different kinds of quantities, like fuel used per second. A unit rate compares that total to just ONE unit of the second quantity — to find it, divide the total amount by the total count (seconds, minutes, adjustments, whatever is being counted).',
          example: 'A rocket burns 450 liters of fuel in 3 minutes. Rate = 450 ÷ 3 = 150 liters per minute.',
          practiceGeneratorId: 'gen-unit-rate',
          practiceCount: 4
        },
        {
          label: 'Using a Rate to Predict a Total',
          teachingText:
            'Once you know a unit rate, you can predict the total for any other amount by multiplying the rate by the new count — this works because the rate stays the same no matter how much time or how many units pass.',
          example: 'At a rate of 150 liters per minute, in 5 minutes a rocket would burn 150 × 5 = 750 liters.',
          practiceGeneratorId: 'gen-rate-prediction',
          practiceCount: 4
        }
      ],
      connection:
        "Mission planners calculate fuel consumption rates constantly — knowing exactly how much fuel burns per second lets them predict whether a rocket has enough fuel to complete a maneuver before it even launches, and the same rate math predicts everything from data transmission speeds to a rover's travel distance.",
      videoUrl:
        'https://www.khanacademy.org/math/get-ready-for-7th-grade/xa46d6dd638f86863:get-ready-for-rates-proportional-relationships/xa46d6dd638f86863:intro-to-rates/v/introduction-to-rates'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A rocket burns 1,200 kg of fuel in 4 seconds. What is the burn rate in kg per second?',
        answer: '300',
        explanation: 'A unit rate compares the total to one unit of the other quantity.\n\nDivide the total by the count: 1,200 ÷ 4 = 300.',
        commonMistakes: {
          '1204': 'It looks like you added instead of dividing — a unit rate is always found by dividing the total by the count: 1,200 ÷ 4 = 300.'
        },
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A rover travels 45 meters in 9 minutes. What is its unit rate in meters per minute?',
        answer: '5',
        explanation: 'Divide the total distance by the total time: 45 ÷ 9 = 5.',
        commonMistakes: {
          '54': 'It looks like you added instead of dividing — divide the total by the count: 45 ÷ 9 = 5.'
        },
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'At that same rate (5 meters per minute), how far will the rover travel in 25 minutes?',
        answer: '125',
        explanation: 'Once you know the rate, multiply it by the new count to predict the new total: 5 × 25 = 125.',
        commonMistakes: {
          '30': 'It looks like you added instead of multiplying — to predict a new total from a rate, multiply: 5 × 25 = 125.'
        },
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A satellite uses 18 liters of propellant for every 6 orbit adjustments. What is the unit rate in liters per adjustment?',
        answer: '3',
        explanation: 'Divide the total by the count: 18 ÷ 6 = 3.',
        commonMistakes: {
          '24': 'It looks like you added instead of dividing — divide the total by the count: 18 ÷ 6 = 3.',
          '12': "That's 18 − 6, not the unit rate — divide instead: 18 ÷ 6 = 3."
        },
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A drone captures 640 photos over 8 minutes of flight. What is the unit rate in photos per minute?',
        choices: ['80', '648', '5', '72'],
        answer: 0,
        explanation: 'Divide the total by the count: 640 ÷ 8 = 80.',
        choiceFeedback: [
          null,
          'It looks like you added instead of dividing — a unit rate always comes from dividing the total by the count: 640 ÷ 8 = 80.',
          "That's not how this divides — 640 ÷ 8 = 80, not 5.",
          "That's 640 ÷ 8 miscalculated — double check: 8 × 80 = 640, so the rate is 80, not 72."
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'numeric',
        prompt: 'A solar array generates 220 watts over 5 hours of charging. What is the unit rate in watts per hour?',
        answer: '44',
        explanation: 'Divide the total by the count: 220 ÷ 5 = 44.',
        commonMistakes: {
          '225': 'It looks like you added instead of dividing — divide the total by the count: 220 ÷ 5 = 44.'
        },
        xp: 10
      },
      {
        id: 'q7',
        type: 'numeric',
        prompt: 'At a rate of 44 watts per hour, how many watts would a solar array generate in 12 hours?',
        answer: '528',
        explanation: 'Multiply the rate by the new count: 44 × 12 = 528.',
        commonMistakes: {
          '56': 'It looks like you added instead of multiplying — to predict a new total from a rate, multiply: 44 × 12 = 528.'
        },
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A rover transmits data at 12 megabytes per minute. At that same rate, how many megabytes would it transmit in 15 minutes?',
        choices: ['180', '27', '3', '150'],
        answer: 0,
        explanation: 'Multiply the rate by the new count: 12 × 15 = 180.',
        choiceFeedback: [
          null,
          'It looks like you added instead of multiplying — to predict a new total from a rate, multiply: 12 × 15 = 180.',
          "That's 15 ÷ 12, not the right operation here — multiply the rate by the count instead: 12 × 15 = 180.",
          "That's not quite 12 × 15 — double check the multiplication: 12 × 15 = 180."
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'numeric',
        prompt: 'An engine consumes 84 kg of oxidizer over 6 seconds. What is the unit rate in kg per second?',
        answer: '14',
        explanation: 'Divide the total by the count: 84 ÷ 6 = 14.',
        commonMistakes: {
          '78': 'It looks like you subtracted instead of dividing — divide the total by the count: 84 ÷ 6 = 14.'
        },
        xp: 10
      },
      {
        id: 'q10',
        type: 'numeric',
        prompt: 'At a rate of 14 kg per second, how much oxidizer would the engine use over 20 seconds?',
        answer: '280',
        explanation: 'Multiply the rate by the new count: 14 × 20 = 280.',
        commonMistakes: {
          '34': 'It looks like you added instead of multiplying — to predict a new total from a rate, multiply: 14 × 20 = 280.'
        },
        xp: 10
      }
    ]
  },
  {
    id: 'm7-prealgebra-1',
    subject: 'math',
    tier: 1,
    title: 'One-Step Equations: Orbital Basics',
    theme: 'Solving one-step equations',
    novaIntro: {
      beats: [
        {
          label: 'Addition and Subtraction Equations',
          teachingText:
            "A one-step equation is solved by doing the opposite operation to both sides, keeping the equation balanced. If a number is being added to x, subtract that same number from both sides. If a number is being subtracted from x, add that same number to both sides.",
          example: 'Solve x + 7 = 15: subtract 7 from both sides. x = 15 − 7 = 8.',
          practiceGeneratorId: 'gen-onestep-addsub',
          practiceCount: 4
        },
        {
          label: 'Multiplication and Division Equations',
          teachingText:
            'The same balance idea applies to multiplication and division. If x is being multiplied by a number, divide both sides by that number. If x is being divided by a number, multiply both sides by that number.',
          example: 'Solve 6x = 42: divide both sides by 6. x = 42 ÷ 6 = 7.',
          practiceGeneratorId: 'gen-onestep-muldiv',
          practiceCount: 4
        }
      ],
      connection:
        'Orbital calculations often start as a simple equation with one unknown — like solving for the exact velocity needed once you already know the target altitude. One-step equations are the foundation everything more complex builds on.',
      videoUrl: 'https://www.youtube.com/watch?v=jWpiMu5LNdg'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: x + 15 = 42',
        answer: '27',
        explanation: 'To undo adding 15, subtract 15 from both sides.\n\nx = 42 − 15 = 27.',
        commonMistakes: {
          '57': 'It looks like you added 15 again instead of subtracting — to undo addition, subtract: x = 42 − 15 = 27.'
        },
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: x − 12 = 30',
        answer: '42',
        explanation: 'To undo subtracting 12, add 12 to both sides.\n\nx = 30 + 12 = 42.',
        commonMistakes: {
          '18': 'It looks like you subtracted 12 again instead of adding — to undo subtraction, add: x = 30 + 12 = 42.'
        },
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: 6x = 84',
        answer: '14',
        explanation: 'To undo multiplying by 6, divide both sides by 6.\n\nx = 84 ÷ 6 = 14.',
        commonMistakes: {
          '504': 'It looks like you multiplied by 6 again instead of dividing — to undo multiplication, divide: x = 84 ÷ 6 = 14.'
        },
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: x/5 = 9',
        answer: '45',
        explanation: 'To undo dividing by 5, multiply both sides by 5.\n\nx = 9 × 5 = 45.',
        commonMistakes: {
          '1.8': 'It looks like you divided by 5 again instead of multiplying — to undo division, multiply: x = 9 × 5 = 45.'
        },
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Solve for x: x + 23 = 50',
        choices: ['27', '73', '23', '50'],
        answer: 0,
        explanation: 'To undo adding 23, subtract 23 from both sides.\n\nx = 50 − 23 = 27.',
        choiceFeedback: [
          null,
          'It looks like you added 23 again instead of subtracting — to undo addition, subtract: x = 50 − 23 = 27.',
          "That's the number being added, not the solution — subtract 23 from 50 to isolate x: 50 − 23 = 27.",
          "That's the total, not x — subtract 23 from it to find x: 50 − 23 = 27."
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'numeric',
        prompt: 'Solve for x: x − 19 = 26',
        answer: '45',
        explanation: 'To undo subtracting 19, add 19 to both sides.\n\nx = 26 + 19 = 45.',
        commonMistakes: {
          '7': 'It looks like you subtracted 19 again instead of adding — to undo subtraction, add: x = 26 + 19 = 45.'
        },
        xp: 10
      },
      {
        id: 'q7',
        type: 'numeric',
        prompt: 'Solve for x: 9x = 108',
        answer: '12',
        explanation: 'To undo multiplying by 9, divide both sides by 9.\n\nx = 108 ÷ 9 = 12.',
        commonMistakes: {
          '972': 'It looks like you multiplied by 9 again instead of dividing — to undo multiplication, divide: x = 108 ÷ 9 = 12.'
        },
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Solve for x: x/8 = 7',
        choices: ['56', '15', '0.875', '1'],
        answer: 0,
        explanation: 'To undo dividing by 8, multiply both sides by 8.\n\nx = 7 × 8 = 56.',
        choiceFeedback: [
          null,
          'It looks like you added instead of multiplying — to undo division, multiply: x = 7 × 8 = 56.',
          "That's 7 ÷ 8, but you need to undo the division by multiplying instead: x = 7 × 8 = 56.",
          "That's not the right operation here — multiply 7 by 8 to isolate x: x = 7 × 8 = 56."
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'numeric',
        prompt: 'Solve for x: x + 8 = 8',
        answer: '0',
        explanation: 'To undo adding 8, subtract 8 from both sides.\n\nx = 8 − 8 = 0.',
        commonMistakes: {
          '16': 'It looks like you added 8 again instead of subtracting — to undo addition, subtract: x = 8 − 8 = 0.'
        },
        xp: 10
      },
      {
        id: 'q10',
        type: 'numeric',
        prompt: 'Solve for x: x/4 = 11',
        answer: '44',
        explanation: 'To undo dividing by 4, multiply both sides by 4.\n\nx = 11 × 4 = 44.',
        commonMistakes: {
          '2.75': 'It looks like you divided by 4 again instead of multiplying — to undo division, multiply: x = 11 × 4 = 44.'
        },
        xp: 10
      }
    ]
  },
  {
    id: 'm7-prealgebra-2',
    subject: 'math',
    tier: 1,
    title: 'Two-Step Equations: Trajectory Calculations',
    theme: 'Solving two-step equations',
    novaIntro: {
      beats: [
        {
          label: 'Two-Step Equations with Multiplication',
          teachingText:
            'A two-step equation needs two operations undone, in reverse order from how they were applied. When x is multiplied by a number and then something is added or subtracted, undo the addition/subtraction first, then divide to undo the multiplication.',
          example: 'Solve 3x + 5 = 20: subtract 5 from both sides (3x = 15), then divide by 3 (x = 5).',
          practiceGeneratorId: 'gen-twostep-mult',
          practiceCount: 4
        },
        {
          label: 'Two-Step Equations with Division',
          teachingText:
            'The same reverse-order idea applies when x is divided by a number instead. Undo the addition/subtraction first, then multiply to undo the division.',
          example: 'Solve x/3 − 2 = 5: add 2 to both sides (x/3 = 7), then multiply by 3 (x = 21).',
          practiceGeneratorId: 'gen-twostep-div',
          practiceCount: 4
        }
      ],
      connection:
        'Trajectory calculations frequently involve two-step equations — like solving for an unknown burn time once you know both a fixed delay and a rate of change. Missing either step gives a wrong trajectory.',
      videoUrl: 'https://www.youtube.com/watch?v=_y_Q3_B2Vh8'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: 3x + 7 = 28',
        answer: '7',
        explanation: 'Subtract 7 from both sides first: 3x = 21.\n\nThen divide both sides by 3: x = 21 ÷ 3 = 7.',
        commonMistakes: {
          '11.67': 'It looks like you divided 28 by 3 before subtracting the 7 — undo operations in reverse order: subtract 7 first (3x = 21), then divide by 3.'
        },
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: 2x − 5 = 19',
        answer: '12',
        explanation: 'Add 5 to both sides first: 2x = 24.\n\nThen divide both sides by 2: x = 24 ÷ 2 = 12.',
        commonMistakes: {
          '9.5': 'It looks like you divided 19 by 2 before adding the 5 — undo operations in reverse order: add 5 first (2x = 24), then divide by 2.'
        },
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: 4x + 10 = 50',
        answer: '10',
        explanation: 'Subtract 10 from both sides first: 4x = 40.\n\nThen divide both sides by 4: x = 40 ÷ 4 = 10.',
        commonMistakes: {
          '15': 'It looks like you divided 50 by 4 before subtracting the 10 — undo operations in reverse order: subtract 10 first (4x = 40), then divide by 4.'
        },
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: x/3 − 2 = 5',
        answer: '21',
        explanation: 'Add 2 to both sides first: x/3 = 7.\n\nThen multiply both sides by 3: x = 7 × 3 = 21.',
        commonMistakes: {
          '15': 'That\'s x/3, not x — you still need to multiply by 3 to fully isolate x: 7 × 3 = 21.'
        },
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Solve for x: 5x − 8 = 32',
        choices: ['8', '4.8', '160', '40'],
        answer: 0,
        explanation: 'Add 8 to both sides first: 5x = 40.\n\nThen divide both sides by 5: x = 40 ÷ 5 = 8.',
        choiceFeedback: [
          null,
          'It looks like you divided 32 by 5 before adding the 8 — undo operations in reverse order: add 8 first (5x = 40), then divide by 5.',
          "That's 32 × 5, not the right operation — add 8 to 32 first (getting 40), then divide by 5 to get 8.",
          "That's 32 + 8, but you still need to divide by 5 to isolate x: 40 ÷ 5 = 8."
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'numeric',
        prompt: 'Solve for x: 6x + 9 = 63',
        answer: '9',
        explanation: 'Subtract 9 from both sides first: 6x = 54.\n\nThen divide both sides by 6: x = 54 ÷ 6 = 9.',
        commonMistakes: {
          '12': 'It looks like you divided 63 by 6 before subtracting the 9 — undo operations in reverse order: subtract 9 first (6x = 54), then divide by 6.'
        },
        xp: 10
      },
      {
        id: 'q7',
        type: 'numeric',
        prompt: 'Solve for x: x/4 + 6 = 15',
        answer: '36',
        explanation: 'Subtract 6 from both sides first: x/4 = 9.\n\nThen multiply both sides by 4: x = 9 × 4 = 36.',
        commonMistakes: {
          '9': "That's x/4, not x — you still need to multiply by 4 to fully isolate x: 9 × 4 = 36."
        },
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Solve for x: x/5 − 3 = 4',
        choices: ['35', '7', '5', '20'],
        answer: 0,
        explanation: 'Add 3 to both sides first: x/5 = 7.\n\nThen multiply both sides by 5: x = 7 × 5 = 35.',
        choiceFeedback: [
          null,
          "That's x/5, not x — you still need to multiply by 5 to fully isolate x: 7 × 5 = 35.",
          "That's the divisor, not the solution — solve the full equation: add 3 to both sides, then multiply by 5.",
          "That's 4 × 5, but you need to add 3 to 4 first (getting 7), then multiply by 5: 7 × 5 = 35."
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'numeric',
        prompt: 'Solve for x: 7x − 6 = 22',
        answer: '4',
        explanation: 'Add 6 to both sides first: 7x = 28.\n\nThen divide both sides by 7: x = 28 ÷ 7 = 4.',
        commonMistakes: {
          '2.29': 'It looks like you divided 22 by 7 before adding the 6 — undo operations in reverse order: add 6 first (7x = 28), then divide by 7.'
        },
        xp: 10
      },
      {
        id: 'q10',
        type: 'numeric',
        prompt: 'Solve for x: x/6 + 4 = 11',
        answer: '42',
        explanation: 'Subtract 4 from both sides first: x/6 = 7.\n\nThen multiply both sides by 6: x = 7 × 6 = 42.',
        commonMistakes: {
          '7': "That's x/6, not x — you still need to multiply by 6 to fully isolate x: 7 × 6 = 42."
        },
        xp: 10
      }
    ]
  },
  {
    id: 'm7-integers-1',
    subject: 'math',
    tier: 1,
    title: 'Altitude & Temperature Changes',
    theme: 'Adding and subtracting integers',
    novaIntro: {
      beats: [
        {
          label: 'Adding Integers (Combining a Value with a Change)',
          teachingText:
            'Integers include negative numbers. Adding a positive change moves a value up; adding a negative change (or "dropping" by some amount) moves it down. Combine the starting value and the change directly, keeping track of the sign.',
          example: 'Temperature is -10°C and rises 25°C: -10 + 25 = 15°C.',
          practiceGeneratorId: 'gen-integer-add',
          practiceCount: 4
        },
        {
          label: 'Finding the Change Between Two Values',
          teachingText:
            'When you know a starting value and an ending value, the total change is the ending value minus the starting value. A positive result means an increase; a negative result means a decrease.',
          example: 'A probe moves from 1,200 m to -300 m: -300 − 1,200 = -1,500 m — a decrease of 1,500 meters.',
          practiceGeneratorId: 'gen-integer-difference',
          practiceCount: 4
        }
      ],
      connection:
        "Altitude and temperature both use negative numbers regularly — a submarine's depth or an aircraft's temperature at altitude can swing from positive to negative, and engineers need to track those changes precisely.",
      videoUrl: 'https://www.youtube.com/watch?v=NQSN00zL5gg'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: "A sensor reads -40°C at launch. Temperature rises 65°C during ascent. What's the new temperature, in °C?",
        answer: '25',
        explanation: 'Combine the starting value and the change: -40 + 65 = 25.',
        commonMistakes: {
          '-105': 'It looks like you subtracted the rise instead of adding it — a rise means adding: -40 + 65 = 25.'
        },
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A probe descends from 1,200 m to -300 m relative to sea level. What is the total change in altitude, in meters? (Use a negative number for a decrease)',
        answer: '-1500',
        explanation: 'The total change is the ending value minus the starting value: -300 − 1,200 = -1,500.',
        commonMistakes: {
          '1500': "The sign matters here — since the probe descended (went down), the change should be negative: -300 − 1,200 = -1,500."
        },
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: "Temperature drops 12°C every hour for 3 hours, starting at 5°C. What's the temperature after 3 hours, in °C?",
        answer: '-31',
        explanation: 'Three hourly drops of 12°C total a change of -36°C. Combine that with the starting value: 5 + (-36) = -31.',
        commonMistakes: {
          '41': 'It looks like you added the drops instead of subtracting them — a drop means combining a negative change: 5 + (-36) = -31.',
          '-36': "That's the total change, not the final temperature — combine it with the starting value: 5 + (-36) = -31."
        },
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A recovery drone is at -150 m. It rises 90 m. What is its new position, in meters?',
        answer: '-60',
        explanation: 'Combine the starting value and the change: -150 + 90 = -60.',
        commonMistakes: {
          '-240': 'It looks like you subtracted the rise instead of adding it — a rise means adding: -150 + 90 = -60.'
        },
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A weather balloon is at 800 m. It descends 950 m. What is its new position, in meters?',
        choices: ['-150', '150', '1750', '-1750'],
        answer: 0,
        explanation: 'A descent of 950 m means combining a negative change: 800 + (-950) = -150.',
        choiceFeedback: [
          null,
          "The sign matters here — since the balloon descended below its starting position, the answer should be negative: 800 + (-950) = -150.",
          "It looks like you added instead of combining the descent as a negative change: 800 + (-950) = -150.",
          "That's not quite right — double check the combination: 800 + (-950) = -150, not -1750."
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'numeric',
        prompt: 'A submarine is at -220 m. It descends another 80 m. What is its new position, in meters?',
        answer: '-300',
        explanation: 'A further descent means combining another negative change: -220 + (-80) = -300.',
        commonMistakes: {
          '-140': 'It looks like you subtracted instead of adding the further descent — combine both negative values: -220 + (-80) = -300.'
        },
        xp: 10
      },
      {
        id: 'q7',
        type: 'numeric',
        prompt: 'A rocket stage separates at 12,000 m and falls to 3,500 m before its parachute deploys. What is the total change in altitude, in meters? (Use a negative number for a decrease)',
        answer: '-8500',
        explanation: 'The total change is the ending value minus the starting value: 3,500 − 12,000 = -8,500.',
        commonMistakes: {
          '8500': 'The sign matters here — since the stage fell (decreased in altitude), the change should be negative: 3,500 − 12,000 = -8,500.'
        },
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A temperature reading goes from -18°C to 6°C. What is the total change, in °C?',
        choices: ['24', '-24', '12', '-12'],
        answer: 0,
        explanation: 'The total change is the ending value minus the starting value: 6 − (-18) = 24.',
        choiceFeedback: [
          null,
          "The sign should be positive here, since the temperature increased — 6 − (-18) = 24, not -24.",
          "That's not the full change — 6 − (-18) = 24, not 12.",
          "The sign should be positive since the temperature rose, and the size of the change is 24, not 12."
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'numeric',
        prompt: 'A rover is at an elevation of -85 m. It climbs 130 m. What is its new elevation, in meters?',
        answer: '45',
        explanation: 'Combine the starting value and the change: -85 + 130 = 45.',
        commonMistakes: {
          '-215': 'It looks like you subtracted the climb instead of adding it — a climb means adding: -85 + 130 = 45.'
        },
        xp: 10
      },
      {
        id: 'q10',
        type: 'numeric',
        prompt: 'Cabin pressure drops 4 units every minute for 5 minutes, starting at 20 units. What is the pressure after 5 minutes?',
        answer: '0',
        explanation: 'Five minutes of 4-unit drops total a change of -20. Combine that with the starting value: 20 + (-20) = 0.',
        commonMistakes: {
          '40': 'It looks like you added the drops instead of subtracting them — a drop means combining a negative change: 20 + (-20) = 0.'
        },
        xp: 10
      }
    ]
  },
  {
    id: 'm7-arithmetic-1',
    subject: 'math',
    tier: 1,
    title: 'Mission Countdown Arithmetic',
    theme: 'Order of operations in countdown sequence calculations',
    novaIntro: {
      concept: 'Order of operations (PEMDAS) tells you exactly which calculation to do first when a problem has several: Parentheses, Exponents, Multiplication/Division (left to right), then Addition/Subtraction (left to right). Skipping this order gives a completely different, wrong answer.',
      example: 'Compute 4 + 2 × (6 − 3): parentheses first (6−3=3), then multiplication (2×3=6), then addition (4+6=10).',
      connection: 'Countdown timing calculations often combine several operations in one formula. Mission control software follows order of operations exactly — a human double-checking that math needs to follow the same rule, every time, with no shortcuts.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Compute: 3 + 4 × 6 − 5',
        answer: '22',
        explanation: 'Multiply first: 4 × 6 = 24. Then 3 + 24 − 5 = 22.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Compute: (12 − 4) × 3 + 7',
        answer: '31',
        explanation: 'Parentheses first: 12 − 4 = 8. Then 8 × 3 = 24. Then 24 + 7 = 31.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Compute: 48 ÷ 6 + 5 × 2',
        answer: '18',
        explanation: 'Divide and multiply first: 48 ÷ 6 = 8, 5 × 2 = 10. Then 8 + 10 = 18.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Compute: 100 − (2 × 15 + 20)',
        answer: '50',
        explanation: 'Inside parentheses: 2 × 15 = 30, 30 + 20 = 50. Then 100 − 50 = 50.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-decimals-1',
    subject: 'math',
    tier: 1,
    title: 'Precision Decimal Readings',
    theme: 'Adding, subtracting, multiplying, and dividing decimals for instrument readings',
    novaIntro: {
      concept: 'Decimals represent parts of a whole using place value. When adding or subtracting decimals, line up the decimal points so you’re combining matching place values (tenths with tenths, hundredths with hundredths).',
      example: 'Add 12.75 + 3.4: line up decimal points — 12.75 + 3.40 = 16.15.',
      connection: 'Sensor readings on real spacecraft are rarely whole numbers — a pressure gauge might read 45.62 psi. Engineers work with decimal precision constantly, since rounding too early can hide a dangerous discrepancy.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A fuel gauge reads 45.75 liters. 12.3 liters are added. What is the new reading, in liters?',
        answer: '58.05',
        explanation: '45.75 + 12.3 = 58.05.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A component costs $128.50. After a $23.75 discount, what is the price?',
        answer: '104.75',
        explanation: '128.50 − 23.75 = 104.75.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Each of 6 identical sensors weighs 2.15 kg. What is the total weight, in kg?',
        answer: '12.9',
        explanation: '2.15 × 6 = 12.9 kg.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A tank holds 84.6 liters split evenly among 3 compartments. How much is in each compartment, in liters?',
        answer: '28.2',
        explanation: '84.6 ÷ 3 = 28.2 liters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-percentages-1',
    subject: 'math',
    tier: 1,
    title: 'Mission Success Percentages',
    theme: 'Percent of a number and percent change for launch statistics',
    novaIntro: {
      concept: 'A percentage is a fraction out of 100. To find a percent of a number, convert the percent to a decimal (divide by 100) and multiply.',
      example: 'What is 20% of 150? 0.20 × 150 = 30.',
      connection: 'Mission success rates, test pass rates, and safety margins are almost always expressed as percentages. Being able to calculate them quickly lets an engineer evaluate risk on the spot.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Out of 40 test launches, 34 succeeded. What percent succeeded? (Answer as a number, like 90)',
        answer: '85',
        explanation: '34 ÷ 40 = 0.85 = 85%.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: "A rocket's original weight is 2,000 kg. A redesign reduces it by 15%. What is the new weight, in kg?",
        answer: '1700',
        explanation: '2000 × (1 − 0.15) = 2000 × 0.85 = 1,700 kg.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A supplier raises the price of a $250 part by 8%. What is the new price?',
        answer: '270',
        explanation: '250 × 1.08 = 270.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: '120 students apply to a STEM program. 25% are accepted. How many students are accepted?',
        answer: '30',
        explanation: '120 × 0.25 = 30.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-measurement-1',
    subject: 'math',
    tier: 1,
    title: 'Mission Measurement Conversions',
    theme: 'Converting between units for engineering specs',
    novaIntro: {
      concept: 'Converting between units means multiplying or dividing by the conversion factor between them — like 1,000 meters in a kilometer. The key is knowing which direction to convert: multiply when going from a larger unit to a smaller one, divide when going the other way.',
      example: 'Convert 3.5 kilometers to meters: 3.5 × 1,000 = 3,500 meters.',
      connection: 'Aerospace engineers often work with both metric and imperial units depending on the country or agency involved — a measurement error from a bad unit conversion has caused real mission failures in the past, which is exactly why this skill matters.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A component is 3.5 meters long. How many centimeters is that?',
        answer: '350',
        explanation: '3.5 m × 100 = 350 cm.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A fuel tank holds 12,000 milliliters. How many liters is that?',
        answer: '12',
        explanation: '12,000 ÷ 1,000 = 12 liters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A rocket stage weighs 4.2 metric tons. How many kilograms is that?',
        answer: '4200',
        explanation: '4.2 × 1,000 = 4,200 kg.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A mission task takes 150 minutes. How many hours is that? (Answer as a decimal, like 1.5)',
        answer: '2.5',
        explanation: '150 ÷ 60 = 2.5 hours.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-logic-1',
    subject: 'math',
    tier: 1,
    title: "Engineer's Logic Checks",
    theme: 'Deductive reasoning and number patterns used in mission readiness checks',
    novaIntro: {
      concept: 'Deductive reasoning uses a general rule to reach a specific, certain conclusion. If the rule is true and the situation matches it, the conclusion must be true. Number patterns work similarly — once you spot the rule connecting each term, you can predict the next one.',
      example: 'Pattern: 3, 6, 12, 24, ? — each term doubles, so the next is 48.',
      connection: 'Engineers rely on deductive reasoning to troubleshoot systems: if a rule says a failure always triggers a specific warning, and the warning appears, they can deduce the failure occurred — without having to see it directly.'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Rule: every thruster must be inspected before launch. Thruster C has not been inspected. Can the rocket launch today?',
        choices: ['Yes', 'No', 'Only if Thruster C is the backup', 'Cannot be determined'],
        answer: 1,
        explanation: 'The rule requires every thruster to be inspected. Since Thruster C has not been, the rocket cannot launch.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What comes next in the pattern? 2, 4, 8, 16, ?, 64',
        choices: ['24', '32', '48', '56'],
        answer: 1,
        explanation: 'Each number doubles the one before it: 16 × 2 = 32 (then 32 × 2 = 64).',
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          "Engineers found every rocket with a cracked seal failed its pressure test. Rocket X passed its pressure test. What can you conclude?",
        choices: [
          "Rocket X's seal is definitely cracked",
          "Rocket X's seal is not cracked",
          'Rocket X has no seal',
          'Nothing can be concluded'
        ],
        answer: 1,
        explanation:
          'If a cracked seal always causes a failed test, then passing the test means the seal is not cracked.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'What comes next in the pattern? 3, 6, 12, 24, ?',
        answer: '48',
        explanation: 'Each number doubles: 24 × 2 = 48.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-arithmetic-2',
    subject: 'math',
    tier: 1,
    title: 'Mission Timeline Arithmetic',
    theme: 'More order-of-operations practice with layered countdown calculations',
    novaIntro: {
      concept: 'This is more practice with order of operations (PEMDAS), now with numbers arranged in longer chains. Work through parentheses first, then exponents, then multiplication/division left to right, then addition/subtraction left to right.',
      example: 'Compute 8 + 3 × (12 − 7): parentheses first (12−7=5), then multiply (3×5=15), then add (8+15=23).',
      connection: 'Real countdown sequences chain multiple timed events together. Getting the order right in a calculation mirrors getting the order right in an actual launch sequence — both fail if steps happen out of order.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Compute: 8 + 3 × (12 − 7)',
        answer: '23',
        explanation: 'Parentheses first: 12 − 7 = 5. Then 3 × 5 = 15. Then 8 + 15 = 23.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Compute: (20 − 8) ÷ 4 + 6 × 2',
        answer: '15',
        explanation: 'Parentheses: 20 − 8 = 12. Then 12 ÷ 4 = 3, and 6 × 2 = 12. Then 3 + 12 = 15.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Compute: 50 − 2 × (9 − 4) + 3',
        answer: '43',
        explanation: 'Parentheses: 9 − 4 = 5. Then 2 × 5 = 10. Then 50 − 10 + 3 = 43.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Compute: 6 × (4 + 5) − 18 ÷ 3',
        answer: '48',
        explanation: 'Parentheses: 4 + 5 = 9. Then 6 × 9 = 54, and 18 ÷ 3 = 6. Then 54 − 6 = 48.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-decimals-2',
    subject: 'math',
    tier: 1,
    title: 'Precision Fuel Calculations',
    theme: 'More decimal operations practice for instrument-panel readings',
    novaIntro: {
      concept: 'This continues decimal practice with multiplication and division, alongside addition and subtraction. When multiplying decimals, multiply as if there were no decimal point, then place the decimal based on the total number of decimal places in the original numbers.',
      example: 'A part costs $84.60, split evenly among 4 people: 84.60 ÷ 4 = 21.15.',
      connection: 'Splitting costs, calculating fuel remaining after partial use, and adjusting measurements are everyday decimal tasks for engineers managing a real project budget or fuel supply.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A tank holds 128.75 liters. 45.6 liters are removed. How much remains, in liters?',
        answer: '83.15',
        explanation: '128.75 − 45.6 = 83.15 liters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Four identical components each weigh 3.25 kg. What is their total weight, in kg?',
        answer: '13',
        explanation: '3.25 × 4 = 13 kg.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A replacement part costs $84.60, split evenly among 4 team members. How much per person?',
        answer: '21.15',
        explanation: '84.60 ÷ 4 = 21.15.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Add: 12.4 + 8.75 + 3.1',
        answer: '24.25',
        explanation: '12.4 + 8.75 = 21.15, then 21.15 + 3.1 = 24.25.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-percentages-2',
    subject: 'math',
    tier: 1,
    title: 'Mission Efficiency Percentages',
    theme: 'More percent-of-a-number and percent-change practice',
    novaIntro: {
      concept: 'This extends percent calculations to real scenarios: finding a percent of a number, calculating a percent increase or decrease, and finding what percent one number is of another (by dividing and converting to a percent).',
      example: 'Out of 250 parts tested, 235 passed. What percent passed? 235 ÷ 250 = 0.94 = 94%.',
      connection: 'Quality control on a production line is almost always tracked in percentages — a 94% pass rate tells an engineer immediately whether a process needs adjustment before more parts are wasted.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A component originally weighs 500 g. Engineers reduce its weight by 12%. What is the new weight, in grams?',
        answer: '440',
        explanation: '500 × (1 − 0.12) = 500 × 0.88 = 440 g.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Out of 250 parts tested, 235 passed inspection. What percent passed?',
        answer: '94',
        explanation: '235 ÷ 250 = 0.94 = 94%.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: "A project's $8,000 budget is increased by 15% for a new phase. What is the new budget?",
        answer: '9200',
        explanation: '8000 × 1.15 = 9,200.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: '80 students apply to a robotics program, and 60% are accepted. How many students are accepted?',
        answer: '48',
        explanation: '80 × 0.6 = 48.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-measurement-2',
    subject: 'math',
    tier: 1,
    title: 'Advanced Unit Conversions',
    theme: 'More unit-conversion practice across metric distance, volume, weight, and time',
    novaIntro: {
      concept: 'More unit conversion practice, this time across metric distance, volume, weight, and time. The core method stays the same: multiply to go from a bigger unit to a smaller one, divide to go the other way, using the correct conversion factor.',
      example: 'Convert 2.5 kilometers to meters: 2.5 × 1,000 = 2,500 meters.',
      connection: 'A single spacecraft design often mixes measurements from different suppliers and countries — engineers convert between unit systems constantly to make sure every part fits together correctly.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A cable is 2.5 kilometers long. How many meters is that?',
        answer: '2500',
        explanation: '2.5 × 1,000 = 2,500 meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A container holds 3.2 liters. How many milliliters is that?',
        answer: '3200',
        explanation: '3.2 × 1,000 = 3,200 milliliters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A component weighs 750 grams. How many kilograms is that?',
        answer: '0.75',
        explanation: '750 ÷ 1,000 = 0.75 kg.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A mission phase lasts 3 hours and 45 minutes. How many minutes is that in total?',
        answer: '225',
        explanation: '3 × 60 = 180, plus 45 = 225 minutes.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-logic-2',
    subject: 'math',
    tier: 1,
    title: 'Deductive Reasoning Checks II',
    theme: 'Distinguishing valid from invalid logical inferences',
    novaIntro: {
      concept: 'This introduces a common reasoning trap: assuming a rule works in reverse when it doesn\'t. If \'all X are Y,\' that doesn\'t mean \'all Y are X\' — passing a test doesn\'t automatically prove someone meets every other requirement for certification.',
      example: 'Rule: all certified engineers passed a safety exam. Someone passed the exam — does that mean they\'re certified? Not necessarily; certification might require more than just the exam.',
      connection: 'This exact reasoning error is called "affirming the consequent," and catching it matters in engineering: assuming a system is safe just because one test passed, without checking every other requirement, is how real oversights happen.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'What comes next in the pattern? 5, 10, 20, 40, ?',
        answer: '80',
        explanation: 'Each number doubles: 40 × 2 = 80.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Rule: all certified engineers have passed a safety exam. Maria has passed the safety exam. Can we conclude Maria is a certified engineer?',
        choices: [
          'Yes, this can be logically concluded',
          "No — passing the exam alone doesn't guarantee she meets every other certification requirement",
          'Only if she works for NASA',
          'Cannot be determined at all'
        ],
        answer: 1,
        explanation:
          'The rule only says certified engineers passed the exam — it does not say everyone who passed the exam is certified. Assuming otherwise is a common reasoning error.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'What comes next in the pattern? 2, 6, 18, 54, ?',
        answer: '162',
        explanation: 'Each term is multiplied by 3: 54 × 3 = 162.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Rule: if it rains, the outdoor test is postponed. The test was NOT postponed. What can you conclude?',
        choices: ['It rained', 'It did not rain', 'It rained lightly', 'Cannot be determined'],
        answer: 1,
        explanation:
          'Since rain always causes a postponement, and the test was not postponed, it could not have rained. This is a valid logical conclusion.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-fractions-3',
    subject: 'math',
    tier: 1,
    title: 'Dividing Fractions',
    theme: 'Dividing fractions for cargo and module sizing problems',
    novaIntro: {
      concept: 'Dividing by a fraction means multiplying by its reciprocal — flip the second fraction upside down, then multiply straight across.',
      example: 'Divide 3/4 ÷ 1/2: flip to 3/4 × 2/1 = 6/4 = 3/2.',
      connection: 'Splitting a cargo bay or fuel supply into equal fractional sections — like figuring out how many 1/6-meter modules fit in a 5/6-meter space — is exactly a fraction division problem engineers solve when designing storage layouts.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Divide: 3/4 ÷ 1/2',
        answer: '3/2',
        explanation: '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Divide: 2/3 ÷ 4/9',
        answer: '3/2',
        explanation: '2/3 ÷ 4/9 = 2/3 × 9/4 = 18/12 = 3/2.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Divide: 5/6 ÷ 5',
        answer: '1/6',
        explanation: '5/6 ÷ 5 = 5/6 × 1/5 = 5/30 = 1/6.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A cargo bay is 5/6 meters long. Each storage module is 1/6 meter wide. How many modules fit end to end?',
        answer: '5',
        explanation: '5/6 ÷ 1/6 = 5 modules.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-ratios-3',
    subject: 'math',
    tier: 1,
    title: 'Rate & Unit Price Problems',
    theme: 'More unit-rate practice across fuel, parts, and speed',
    novaIntro: {
      concept: 'A unit rate expresses a ratio as an amount per one unit — like miles per gallon or parts per hour. Dividing the total by the count gives you the rate for a single unit, which makes comparing two different options straightforward.',
      example: 'A factory makes 480 parts in 6 hours: rate = 480 ÷ 6 = 80 parts per hour.',
      connection: 'Comparing suppliers, engines, or manufacturing processes almost always comes down to comparing unit rates — whichever has the better rate per dollar, per hour, or per gallon is usually the better choice.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A rocket uses 240 liters of fuel over 60 seconds. What is the fuel rate, in liters per second?',
        answer: '4',
        explanation: '240 ÷ 60 = 4 liters per second.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A supplier sells 3 sensors for $45. What is the unit price per sensor?',
        answer: '15',
        explanation: '45 ÷ 3 = $15 per sensor.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A drone travels 150 meters in 25 seconds. What is its speed, in meters per second?',
        answer: '6',
        explanation: '150 ÷ 25 = 6 meters per second.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A factory produces 480 parts in 8 hours. How many parts per hour?',
        answer: '60',
        explanation: '480 ÷ 8 = 60 parts per hour.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-integers-2',
    subject: 'math',
    tier: 1,
    title: 'Multiplying & Dividing Integers',
    theme: 'Sign rules for multiplying and dividing positive and negative numbers',
    novaIntro: {
      concept: 'When multiplying or dividing integers, the sign rules are consistent: same signs give a positive result, different signs give a negative result.',
      example: '-6 × 4 = -24 (different signs, negative). -36 ÷ -6 = 6 (same signs, positive).',
      connection: 'Engineers track signed values constantly — a negative velocity might mean "descending" while positive means "ascending." Multiplying or dividing these values incorrectly could flip a critical direction in a calculation.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Compute: -6 × 4',
        answer: '-24',
        explanation: 'A negative times a positive is negative: -6 × 4 = -24.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Compute: -36 ÷ -6',
        answer: '6',
        explanation: 'A negative divided by a negative is positive: -36 ÷ -6 = 6.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Compute: 8 × -3',
        answer: '-24',
        explanation: 'A positive times a negative is negative: 8 × -3 = -24.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Compute: -45 ÷ 9',
        answer: '-5',
        explanation: 'A negative divided by a positive is negative: -45 ÷ 9 = -5.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-equations-3',
    subject: 'math',
    tier: 1,
    title: 'Mixed Equation Practice',
    theme: 'Mixed one- and two-step equation review',
    novaIntro: {
      concept: 'This is continued practice solving one- and two-step equations, including with negative numbers. The method is the same: isolate the variable by undoing operations in reverse order, applying the same step to both sides of the equation.',
      example: 'Solve 5x − 8 = 27: add 8 to both sides (5x = 35), then divide by 5 (x = 7).',
      connection: 'Every engineering formula eventually needs to be solved for an unknown — whether that’s force, time, or distance. Comfort with equation-solving is what makes formulas usable rather than just memorized.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: x − 9 = 14',
        answer: '23',
        explanation: 'x = 14 + 9 = 23.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: 3x = 51',
        answer: '17',
        explanation: 'x = 51 ÷ 3 = 17.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: 2x + 5 = 21',
        answer: '8',
        explanation: '2x = 16 → x = 8.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: x/4 − 3 = 2',
        answer: '20',
        explanation: 'x/4 = 5 → x = 20.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-critical-thinking-1',
    subject: 'math',
    tier: 1,
    title: 'Real-World Decision Making',
    theme: 'Comparing options and estimating outcomes — critical thinking with numbers',
    novaIntro: {
      concept: 'Real-world decision problems often require comparing multiple options using the same math skill — addition, multiplication, or percentages — applied to a practical scenario rather than an abstract equation.',
      example: 'Supplier A: $12/unit, free shipping. Supplier B: $10/unit + $30 shipping. For 20 units: A = $240, B = $230. B is cheaper.',
      connection: 'Real engineering decisions — which supplier to use, which design to build — usually come down to exactly this kind of side-by-side comparison, where the math determines the better option, not intuition alone.'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'A team can either run one 300 km test flight or three 90 km test flights. Assuming fuel use is proportional to distance, which uses less total fuel?',
        choices: [
          'The 300 km flight uses less fuel',
          'Three 90 km flights (270 km total) use less fuel',
          'They use exactly the same amount of fuel',
          'Cannot be determined'
        ],
        answer: 1,
        explanation: 'Three 90 km flights cover 270 km total, less than the single 300 km flight, so they use less fuel.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'A part costs $50 and lasts 2 years, or a better part costs $75 and lasts 5 years. Which is the better value over 10 years?',
        choices: [
          'The $50 part, because it costs less upfront',
          'The $75 part, because it costs less overall over 10 years',
          'They cost the same over 10 years',
          'Cannot be determined'
        ],
        answer: 1,
        explanation:
          'Over 10 years: the $50 part needs 5 replacements (5 × $50 = $250); the $75 part needs 2 replacements (2 × $75 = $150). The $75 part is cheaper overall.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt:
          'A launch requires wind speeds under 20 mph. Current wind is 18 mph and rising 1 mph every 10 minutes. In how many minutes will conditions no longer be safe?',
        answer: '20',
        explanation: 'Wind needs to rise 2 more mph to reach 20. At 1 mph per 10 minutes, that takes 20 minutes.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Supplier A charges $12 per unit with free shipping. Supplier B charges $10 per unit plus a flat $30 shipping fee. For an order of 20 units, which supplier is cheaper?',
        choices: ['Supplier A', 'Supplier B', 'Both cost the same', 'Cannot be determined'],
        answer: 1,
        explanation: 'Supplier A: 12 × 20 = $240. Supplier B: 10 × 20 + 30 = $230. Supplier B is cheaper.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-ratios-4',
    subject: 'math',
    tier: 1,
    title: 'Scale Models & Blueprints',
    theme: 'Applying ratios to scale models, maps, and blueprints',
    novaIntro: {
      concept: 'Scale drawings and models use a fixed ratio between a drawing measurement and its real-world size. To find a real measurement, multiply the drawing measurement by the scale factor; to find a drawing measurement, divide by it.',
      example: 'A blueprint uses a 1:25 scale. A wall measures 8 cm on the blueprint: real size = 8 × 25 = 200 cm = 2 meters.',
      connection: 'Every blueprint, from a building to a rocket, is a scale drawing. Reading it correctly means understanding exactly how the drawing’s measurements relate to the real object’s actual dimensions.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A scale model of a rocket is built at a 1:50 scale. If the model is 3 meters tall, how tall is the real rocket, in meters?',
        answer: '150',
        explanation: '3 × 50 = 150 meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A map has a scale of 1 cm : 20 km. If two cities are 4.5 cm apart on the map, what is the actual distance, in km?',
        answer: '90',
        explanation: '4.5 × 20 = 90 km.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A blueprint uses a scale of 1:25. If a wall measures 8 cm on the blueprint, what is its actual length, in meters?',
        answer: '2',
        explanation: '8 × 25 = 200 cm = 2 meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'The ratio of engineers to technicians on a team is 3:5. If there are 15 engineers, how many technicians are there?',
        answer: '25',
        explanation: '15 ÷ 3 = 5 (the scale factor). 5 × 5 = 25 technicians.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-percentages-3',
    subject: 'math',
    tier: 1,
    title: 'Percent Increase & Decrease',
    theme: 'Multi-step percent problems, including combined increases and decreases',
    novaIntro: {
      concept: 'Percent increase or decrease is found by dividing the amount of change by the original amount, then converting to a percent: (new − original) ÷ original × 100.',
      example: 'Revenue grows from $200,000 to $250,000. Change = $50,000. Percent increase = 50,000 ÷ 200,000 = 0.25 = 25%.',
      connection: 'Tracking whether a project’s costs, efficiency, or performance is improving or declining over time almost always uses percent change — it’s the standard way to communicate "how much better or worse" in a way everyone understands.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: "A rocket's weight is first increased by 10%, then decreased by 10%. If the original weight was 1,000 kg, what is the final weight, in kg?",
        answer: '990',
        explanation: '1000 × 1.10 = 1,100. Then 1,100 × 0.90 = 990 kg.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A price increases from $80 to $100. What is the percent increase?',
        answer: '25',
        explanation: '(100 − 80) ÷ 80 = 0.25 = 25%.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: "A component's failure rate drops from 8% to 5%. By how many percentage points did it drop?",
        answer: '3',
        explanation: '8 − 5 = 3 percentage points.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A budget of $5,000 is reduced by 20%, then increased by 10%. What is the final budget?',
        answer: '4400',
        explanation: '5000 × 0.80 = 4,000. Then 4,000 × 1.10 = 4,400.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-decimals-3',
    subject: 'math',
    tier: 1,
    title: 'Multiplying & Dividing Decimals',
    theme: 'More decimal multiplication and division practice',
    novaIntro: {
      concept: 'This continues decimal multiplication and division practice. When multiplying, count the total decimal places in both numbers being multiplied, and place the decimal point that many places from the right in the answer.',
      example: 'Multiply 2.5 × 3.4: 25 × 34 = 850, with 2 total decimal places, so 8.50.',
      connection: 'Precision instruments report decimal readings constantly, and any calculation using those readings — total mass, total cost, total distance — needs accurate decimal multiplication to stay trustworthy.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Multiply: 2.5 × 3.4',
        answer: '8.5',
        explanation: '2.5 × 3.4 = 8.5.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Divide: 15.6 ÷ 1.2',
        answer: '13',
        explanation: '15.6 ÷ 1.2 = 13.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Multiply: 0.75 × 8',
        answer: '6',
        explanation: '0.75 × 8 = 6.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Divide: 9.6 ÷ 0.4',
        answer: '24',
        explanation: '9.6 ÷ 0.4 = 24.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-critical-thinking-2',
    subject: 'math',
    tier: 1,
    title: 'Real-World Decision Making II',
    theme: 'More comparison and estimation problems',
    novaIntro: {
      concept: 'More practice comparing options using real numbers — total cost over time, minimum requirements, and step-by-step reasoning through a scenario’s specific conditions.',
      example: 'Plan A: $200 upfront. Plan B: $50 + $15/month. They cost the same when 200 = 50 + 15m, so m = 10 months.',
      connection: 'Deciding whether to buy equipment outright or lease it over time is a real engineering-adjacent business decision, and it comes down to exactly this kind of break-even calculation.'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Engine A burns for 120 seconds providing 500,000 N of average thrust. Engine B burns for 90 seconds providing 650,000 N of average thrust. Which provides more total impulse (thrust × time)?',
        choices: ['Engine A', 'Engine B', 'They are equal', 'Cannot be determined'],
        answer: 0,
        explanation: 'Engine A: 500,000 × 120 = 60,000,000. Engine B: 650,000 × 90 = 58,500,000. Engine A provides more total impulse.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'A 3-day project needs either 2 people working 8 hrs/day for all 3 days, or 4 people working 8 hrs/day for 1.5 days. Which uses fewer total work-hours?',
        choices: [
          'The first option uses fewer',
          'The second option uses fewer',
          'They use the same total work-hours',
          'Cannot be determined'
        ],
        answer: 2,
        explanation: 'First: 2 × 8 × 3 = 48 work-hours. Second: 4 × 8 × 1.5 = 48 work-hours. They are equal.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt:
          "A satellite's battery drains at 2% per hour and starts at 100%. After how many hours will it reach 50%?",
        answer: '25',
        explanation: '(100 − 50) ÷ 2 = 25 hours.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A part fails inspection 1 out of every 25 times on average. In a batch of 250 parts, about how many would you expect to fail?',
        answer: '10',
        explanation: '250 ÷ 25 = 10 expected failures.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-measurement-3',
    subject: 'math',
    tier: 1,
    title: 'Imperial Unit Conversions',
    theme: 'More unit-conversion practice, this time in miles, feet, gallons, and pounds',
    novaIntro: {
      concept: 'This introduces imperial unit conversions (miles, feet, gallons, pounds) using the same method as metric: multiply to convert to a smaller unit, divide to convert to a larger one, using the correct conversion factor for that unit pair.',
      example: 'Convert 5 miles to feet (1 mile = 5,280 feet): 5 × 5,280 = 26,400 feet.',
      connection: 'NASA and many U.S. aerospace companies still use imperial units for parts of their work, so engineers need to be fluent in converting between imperial and metric without error.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Convert 5 miles to feet. (1 mile = 5,280 feet)',
        answer: '26400',
        explanation: '5 × 5,280 = 26,400 feet.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: "A rocket's fuel tank holds 2,500 gallons. Convert to quarts. (1 gallon = 4 quarts)",
        answer: '10000',
        explanation: '2,500 × 4 = 10,000 quarts.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Convert 12 feet to inches. (1 foot = 12 inches)',
        answer: '144',
        explanation: '12 × 12 = 144 inches.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A component weighs 3.5 pounds. Convert to ounces. (1 pound = 16 ounces)',
        answer: '56',
        explanation: '3.5 × 16 = 56 ounces.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-logic-3',
    subject: 'math',
    tier: 1,
    title: 'Deductive Reasoning Checks III',
    theme: 'More pattern recognition and valid/invalid inference practice',
    novaIntro: {
      concept: 'More practice with number patterns and valid versus invalid logical conclusions — recognizing when a rule genuinely proves something, and when it only seems to.',
      example: 'Pattern: 100, 50, 25, 12.5, ? — each term is divided by 2, so the next is 6.25.',
      connection: 'Recognizing valid patterns quickly helps engineers predict system behavior — like knowing a battery’s charge is decaying by a consistent percentage each hour, and predicting exactly when it will hit a critical threshold.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'What comes next in the pattern? 100, 50, 25, 12.5, ?',
        answer: '6.25',
        explanation: 'Each term is divided by 2: 12.5 ÷ 2 = 6.25.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Rule: if a component passes both a stress test and a thermal test, it is approved. A component passed the stress test but failed the thermal test. Is it approved?',
        choices: ['Yes', 'No — it must pass BOTH tests', 'Only if a supervisor approves it anyway', 'Cannot be determined'],
        answer: 1,
        explanation: 'The rule requires passing both tests. Failing even one means the component is not approved.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'What comes next in the pattern? 1, 4, 9, 16, 25, ?',
        answer: '36',
        explanation: 'These are perfect squares (1², 2², 3², 4², 5²...), so the next is 6² = 36.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Rule: all flight-ready rockets have passed a full systems check. Rocket Z has not passed a full systems check. What can you conclude?',
        choices: ['Rocket Z is flight-ready', 'Rocket Z is not flight-ready', 'Rocket Z passed a partial check', 'Cannot be determined'],
        answer: 1,
        explanation: 'Since passing the full systems check is required for flight-readiness, not passing it means Rocket Z is not flight-ready.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-fractions-4',
    subject: 'math',
    tier: 1,
    title: 'Fraction, Decimal & Percent Conversions',
    theme: 'Converting between the three ways of representing the same value',
    novaIntro: {
      concept: 'Fractions, decimals, and percents are three ways of writing the same value. To convert a fraction to a decimal, divide the numerator by the denominator. To convert a decimal to a percent, multiply by 100.',
      example: 'Convert 3/4 to a decimal: 3 ÷ 4 = 0.75. As a percent: 0.75 × 100 = 75%.',
      connection: 'Data sheets, reports, and specifications switch between fractions, decimals, and percentages depending on context — an engineer needs to convert fluently between all three without losing accuracy.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Convert 3/4 to a decimal.',
        answer: '0.75',
        explanation: '3 ÷ 4 = 0.75.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Convert 0.6 to a fraction in simplest form.',
        answer: '3/5',
        explanation: '0.6 = 6/10, which simplifies to 3/5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Convert 1/5 to a percent. (Answer as a number, like 50)',
        answer: '20',
        explanation: '1/5 = 0.20 = 20%.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Convert 45% to a fraction in simplest form.',
        answer: '9/20',
        explanation: '45% = 45/100, which simplifies to 9/20.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-decimals-4',
    subject: 'math',
    tier: 1,
    title: 'Rounding Decimals',
    theme: 'Rounding to a specified decimal place',
    novaIntro: {
      concept: 'Rounding a decimal means looking at the digit just past the place you’re rounding to. If it’s 5 or more, round up; if it’s less than 5, round down.',
      example: 'Round 7.856 to the nearest tenth: look at the hundredths digit (5), round up — 7.9.',
      connection: 'Engineering specifications often require rounding to a specific precision — reporting a measurement to more decimal places than the instrument can actually measure would be misleading, so knowing exactly how to round matters.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Round 3.14159 to the nearest hundredth.',
        answer: '3.14',
        explanation: 'The thousandths digit (1) rounds down, keeping 3.14.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Round 7.856 to the nearest tenth.',
        answer: '7.9',
        explanation: 'The hundredths digit (5) rounds the tenths digit up from 8 to 9: 7.9.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Round 12.345 to the nearest whole number.',
        answer: '12',
        explanation: 'The tenths digit (3) rounds down, keeping 12.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Round 0.0678 to the nearest thousandth.',
        answer: '0.068',
        explanation: 'The ten-thousandths digit (8) rounds the thousandths digit up from 7 to 8: 0.068.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-percentages-4',
    subject: 'math',
    tier: 1,
    title: 'Discounts, Tax & Tips',
    theme: 'Real-world percent applications: sales, tax, and gratuity',
    novaIntro: {
      concept: 'Real-world percent problems often stack multiple steps: calculating a discount, then adding tax, or finding just the discount amount rather than the final price.',
      example: 'A $60 jacket is 25% off: discount = 60 × 0.25 = $15. Sale price = 60 − 15 = $45.',
      connection: 'Budgeting for parts and materials on an engineering project involves exactly this kind of layered percent calculation — discounts, taxes, and fees all stack together to determine the real final cost.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: "A jacket costs $60. It's on sale for 25% off. What is the sale price?",
        answer: '45',
        explanation: '60 × (1 − 0.25) = 60 × 0.75 = $45.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A meal costs $40 before tax. With 8% sales tax, what is the total?',
        answer: '43.2',
        explanation: '40 × 1.08 = $43.20.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A $50 delivery order has a 15% tip added. What is the total?',
        answer: '57.5',
        explanation: '50 × 1.15 = $57.50.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A $120 item is discounted by 30%. What is the discount amount (not the final price)?',
        answer: '36',
        explanation: '120 × 0.30 = $36 discount.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-critical-thinking-3',
    subject: 'math',
    tier: 1,
    title: 'Real-World Decision Making III',
    theme: 'More multi-step planning and comparison problems',
    novaIntro: {
      concept: 'More multi-step decision problems — this time involving budgets, minimum requirements, and comparing costs across different scenarios using several operations in sequence.',
      example: 'A $10,000 budget covers $3,500 in parts and $4,200 in labor. Remaining: 10,000 − 3,500 − 4,200 = $2,300.',
      connection: 'Every real engineering project runs on a budget with multiple cost categories — tracking what remains after each expense is a routine but essential part of managing the project.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt:
          'A rocket needs 3 successful tests before launch approval. It has had 2 successes and 1 failure so far, with 2 more tests scheduled. What is the minimum number of the remaining 2 tests that must succeed?',
        answer: '1',
        explanation: 'It needs 3 total successes and already has 2, so at least 1 more success is required.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt:
          'Plan A costs $200 upfront with no monthly fee. Plan B costs $50 upfront plus $15/month. After how many months do both plans cost the same total?',
        answer: '10',
        explanation: '200 = 50 + 15m → 150 = 15m → m = 10 months.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'A satellite needs a minimum of 3 out of 4 sensors working to operate safely. Sensor 1 failed; Sensors 2, 3, and 4 are working. Can the satellite operate safely?',
        choices: [
          'Yes — 3 of 4 sensors are working, meeting the minimum',
          'No, it needs all 4',
          'Only if a human overrides it',
          'Cannot be determined'
        ],
        answer: 0,
        explanation: '3 of the 4 sensors are working, which meets the minimum requirement of 3.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A budget of $10,000 must cover parts costing $3,500 and labor costing $4,200. How much remains for contingency?',
        answer: '2300',
        explanation: '10,000 − 3,500 − 4,200 = 2,300.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-arithmetic-3',
    subject: 'math',
    tier: 1,
    title: 'Exponents Basics',
    theme: 'Computing simple exponent expressions',
    novaIntro: {
      concept: 'An exponent tells you how many times to multiply a number by itself. 2⁴ means 2 × 2 × 2 × 2, not 2 × 4.',
      example: 'Compute 2⁴: 2 × 2 × 2 × 2 = 16.',
      connection: 'Exponents show up constantly in engineering — from calculating area and volume to expressing very large or very small numbers in scientific notation, like a processor completing 10⁹ operations per second.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Compute: 2⁴',
        answer: '16',
        explanation: '2 × 2 × 2 × 2 = 16.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Compute: 3³',
        answer: '27',
        explanation: '3 × 3 × 3 = 27.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Compute: 5² + 2³',
        answer: '33',
        explanation: '5² = 25, 2³ = 8. 25 + 8 = 33.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Compute: 10³ − 4²',
        answer: '984',
        explanation: '10³ = 1,000, 4² = 16. 1,000 − 16 = 984.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-measurement-4',
    subject: 'math',
    tier: 1,
    title: 'Time Conversions',
    theme: 'Converting between days, hours, minutes, and weeks',
    novaIntro: {
      concept: 'Time conversions follow the same logic as other unit conversions, using the specific relationships between time units: 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day, 7 days in a week.',
      example: 'Convert 3 days to hours: 3 × 24 = 72 hours.',
      connection: 'Mission timelines are tracked in mixed units — seconds during launch, hours during a maneuver, days during transit. Converting between them accurately keeps every team member working from the same schedule.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Convert 3 days to hours.',
        answer: '72',
        explanation: '3 × 24 = 72 hours.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Convert 90 minutes to hours (as a decimal).',
        answer: '1.5',
        explanation: '90 ÷ 60 = 1.5 hours.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A mission task takes 2 hours 45 minutes. How many total minutes is that?',
        answer: '165',
        explanation: '2 × 60 + 45 = 165 minutes.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Convert 2 weeks to days.',
        answer: '14',
        explanation: '2 × 7 = 14 days.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-ratios-5',
    subject: 'math',
    tier: 1,
    title: 'Solving Proportions',
    theme: 'Using cross-multiplication to solve proportional relationships',
    novaIntro: {
      concept: 'A proportion is two equal ratios. To solve for an unknown in a proportion, cross-multiply: multiply the numerator of one ratio by the denominator of the other, and set the two products equal.',
      example: 'Solve 3/4 = x/20: cross-multiply, 3 × 20 = 4x, so 60 = 4x, and x = 15.',
      connection: 'Scaling a design up or down — like adjusting a part’s dimensions to fit a new specification while keeping its proportions consistent — is a direct application of solving proportions.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve the proportion: 3/4 = x/20',
        answer: '15',
        explanation: 'Cross-multiply: 3 × 20 = 4x → 60 = 4x → x = 15.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve the proportion: 5/8 = 15/x',
        answer: '24',
        explanation: 'Cross-multiply: 5x = 8 × 15 = 120 → x = 24.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'If 4 workers can build 2 satellites in a week, how many satellites can 8 workers build in a week, at the same rate per worker?',
        answer: '4',
        explanation: '8 workers is double 4 workers, so output doubles too: 2 × 2 = 4 satellites.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A map scale is 2 cm : 50 km. How many km does 7 cm represent?',
        answer: '175',
        explanation: '(7 ÷ 2) × 50 = 3.5 × 50 = 175 km.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-integers-3',
    subject: 'math',
    tier: 1,
    title: 'Real-World Integer Applications',
    theme: 'Integers in temperature, elevation, and altitude contexts',
    novaIntro: {
      concept: 'This applies integer addition and subtraction to real contexts like temperature and elevation, where negative numbers represent "below zero" or "below sea level."',
      example: 'Temperature rises from -5°F to a new value after a 12°F increase: -5 + 12 = 7°F.',
      connection: 'Altitude, depth, and temperature readings on real missions constantly cross zero — from a submarine’s depth to a rocket’s temperature at altitude — and engineers need integer math to track those changes accurately.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'The temperature was -5°F in the morning and rose 12°F by noon. What was the noon temperature?',
        answer: '7',
        explanation: '-5 + 12 = 7°F.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A submarine is at -150 m elevation (below sea level). It rises 40 m. What is its new elevation?',
        answer: '-110',
        explanation: '-150 + 40 = -110 m.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A plane is at 30,000 ft. It descends 8,500 ft. What is its new altitude?',
        answer: '21500',
        explanation: '30,000 − 8,500 = 21,500 ft.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'The temperature dropped from 8°F to -6°F. By how many degrees did it drop?',
        answer: '14',
        explanation: '8 − (-6) = 14 degrees.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-logic-4',
    subject: 'math',
    tier: 1,
    title: 'Deductive Reasoning Checks IV',
    theme: 'More pattern recognition and valid/invalid inference practice',
    novaIntro: {
      concept: 'More practice recognizing valid logical conclusions versus common reasoning errors, plus geometric number patterns (where each term is found by a consistent operation on the previous one).',
      example: 'Pattern: 2, 4, 8, 16, 32, ? — each term doubles, so the next is 64.',
      connection: 'Recognizing exponential patterns — like a compounding cost or a rapidly draining resource — helps engineers anticipate problems well before they become critical.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'What comes next in the pattern? 2, 4, 8, 16, 32, ?',
        answer: '64',
        explanation: 'Each term doubles: 32 × 2 = 64.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Rule: all certified pilots have logged 1,500+ flight hours. Maria has logged 1,500+ flight hours. Can we conclude she is a certified pilot?',
        choices: [
          'Yes, definitely',
          "No — logging hours alone doesn't guarantee certification, since other requirements might exist",
          'Only if she asks',
          'Cannot be determined at all'
        ],
        answer: 1,
        explanation: 'The rule only says certified pilots have logged the hours — not that everyone with the hours is certified.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'What comes next in the pattern? 3, 9, 27, 81, ?',
        answer: '243',
        explanation: 'Each term is multiplied by 3: 81 × 3 = 243.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Rule: if the engine overheats, the warning light turns on. The warning light is NOT on. What can you conclude?',
        choices: ['The engine overheated', 'The engine did not overheat', 'The engine is off', 'Cannot be determined'],
        answer: 1,
        explanation: 'Since overheating always triggers the light, and the light is off, the engine could not have overheated.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-equations-4',
    subject: 'math',
    tier: 1,
    title: 'More Mixed Equations',
    theme: 'More one- and two-step equation practice, including negative numbers',
    novaIntro: {
      concept: 'More two-step equation practice, now including negative coefficients and negative results. The same undo-in-reverse method applies regardless of whether the numbers are positive or negative.',
      example: 'Solve -3x + 10 = 1: subtract 10 from both sides (-3x = -9), then divide by -3 (x = 3).',
      connection: 'Formulas involving direction or loss — like fuel being used up, or altitude decreasing — often produce negative coefficients, and solving them correctly requires comfort with negative-number equations.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: 5x − 8 = 27',
        answer: '7',
        explanation: '5x = 35 → x = 7.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: -3x + 10 = 1',
        answer: '3',
        explanation: '-3x = -9 → x = 3.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: x + 15 = -4',
        answer: '-19',
        explanation: 'x = -4 − 15 = -19.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: 7x = -49',
        answer: '-7',
        explanation: 'x = -49 ÷ 7 = -7.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-arithmetic-4',
    subject: 'math',
    tier: 1,
    title: 'Mixed Operations Order',
    theme: 'More order-of-operations practice combining all four operations',
    novaIntro: {
      concept: 'More order-of-operations practice, this time mixing all four basic operations within parentheses and outside them in the same problem.',
      example: 'Compute (5 + 3) × 2 − 4: parentheses first (8), then multiply (16), then subtract (12).',
      connection: 'Complex mission formulas often combine several operations in one expression — getting the order right the first time avoids costly recalculation later.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Compute: (5 + 3) × 2 − 4',
        answer: '12',
        explanation: '(5+3) = 8. 8 × 2 = 16. 16 − 4 = 12.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Compute: 20 − 3 × (2 + 2)',
        answer: '8',
        explanation: '(2+2) = 4. 3 × 4 = 12. 20 − 12 = 8.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Compute: 100 ÷ (5 × 2) + 3',
        answer: '13',
        explanation: '(5×2) = 10. 100 ÷ 10 = 10. 10 + 3 = 13.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Compute: 6 × (9 − 5) ÷ 3',
        answer: '8',
        explanation: '(9−5) = 4. 6 × 4 = 24. 24 ÷ 3 = 8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-fractions-5',
    subject: 'math',
    tier: 1,
    title: 'Adding & Subtracting Unlike Fractions',
    theme: 'Finding a common denominator to add or subtract fractions',
    novaIntro: {
      concept: 'To add or subtract fractions with different denominators, first find a common denominator, rewrite each fraction using it, then add or subtract the numerators directly.',
      example: 'Add 1/2 + 1/3: common denominator 6 — 3/6 + 2/6 = 5/6.',
      connection: 'Combining partial quantities from different sources — like merging leftover fuel fractions from two different tanks — requires converting to a shared denominator before the amounts can be combined accurately.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Add: 1/2 + 1/3',
        answer: '5/6',
        explanation: 'Common denominator 6: 3/6 + 2/6 = 5/6.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Subtract: 3/4 − 1/6',
        answer: '7/12',
        explanation: 'Common denominator 12: 9/12 − 2/12 = 7/12.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Add: 2/5 + 3/10',
        answer: '7/10',
        explanation: 'Common denominator 10: 4/10 + 3/10 = 7/10.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Subtract: 5/6 − 1/4',
        answer: '7/12',
        explanation: 'Common denominator 12: 10/12 − 3/12 = 7/12.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-ratios-6',
    subject: 'math',
    tier: 1,
    title: 'Comparing Rates',
    theme: 'Comparing unit rates to determine which option is better',
    novaIntro: {
      concept: 'Comparing rates means calculating the unit rate for each option, then comparing those unit rates directly — the better rate depends on what you’re optimizing for (higher output, lower cost, etc.).',
      example: 'Car A: 240 miles on 8 gallons = 30 mpg. Car B: 350 miles on 10 gallons = 35 mpg. B is more efficient.',
      connection: 'Choosing between engines, materials, or suppliers on a real project almost always comes down to comparing their rates side by side — the math makes the better choice obvious.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: "Car A travels 240 miles on 8 gallons. What is Car A's mileage, in miles per gallon?",
        answer: '30',
        explanation: '240 ÷ 8 = 30 mpg.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: "Car B travels 350 miles on 10 gallons. What is Car B's mileage, in miles per gallon?",
        answer: '35',
        explanation: '350 ÷ 10 = 35 mpg.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A factory makes 480 parts in 6 hours. What is its production rate, in parts per hour?',
        answer: '80',
        explanation: '480 ÷ 6 = 80 parts per hour.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A second factory makes 630 parts in 9 hours. What is its production rate, in parts per hour?',
        answer: '70',
        explanation: '630 ÷ 9 = 70 parts per hour.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-decimals-5',
    subject: 'math',
    tier: 1,
    title: 'Multi-Step Decimal Word Problems',
    theme: 'Combining decimal operations across realistic scenarios',
    novaIntro: {
      concept: 'Multi-step decimal problems combine several operations — like multiplying a cost per unit, then adding a flat fee — in the order the situation actually requires.',
      example: 'A part costs $45.50, three are needed, plus a $12.75 fee: 45.50 × 3 = 136.50, then + 12.75 = $149.25.',
      connection: 'Real budgets rarely involve just one calculation — a total cost usually stacks unit prices, quantities, and fees together, exactly like this kind of multi-step decimal problem.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A rocket component costs $45.50. Three are needed, plus a $12.75 shipping fee. What is the total cost?',
        answer: '149.25',
        explanation: '45.50 × 3 = 136.50. 136.50 + 12.75 = 149.25.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A tank had 82.5 liters. 15.75 liters were used, then 20 liters were added. How much is in the tank now?',
        answer: '86.75',
        explanation: '82.5 − 15.75 + 20 = 86.75 liters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A worker is paid $18.50 per hour. How much do they earn for a 6-hour shift?',
        answer: '111',
        explanation: '18.50 × 6 = 111.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A machine part is 12.5 cm long. It is cut into 5 equal pieces. How long is each piece?',
        answer: '2.5',
        explanation: '12.5 ÷ 5 = 2.5 cm.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-percentages-5',
    subject: 'math',
    tier: 1,
    title: 'Percent Change Scenarios',
    theme: 'Calculating percent increase and decrease in real situations',
    novaIntro: {
      concept: 'Percent change problems (increase or decrease) use the same formula regardless of context: divide the amount of change by the original value, then convert to a percent.',
      example: 'A stock drops from $80 to $68. Change = $12. Percent decrease = 12 ÷ 80 = 0.15 = 15%.',
      connection: 'Tracking performance changes — a part’s failure rate dropping, a process getting faster — is reported in percent change so it’s easy to compare improvements across very different projects.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: "A company's revenue grew from $200,000 to $250,000. What is the percent increase?",
        answer: '25',
        explanation: '(250,000 − 200,000) ÷ 200,000 = 0.25 = 25%.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A stock price dropped from $80 to $68. What is the percent decrease?',
        answer: '15',
        explanation: '(80 − 68) ÷ 80 = 0.15 = 15%.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A population grows from 4,000 to 4,800. What is the percent increase?',
        answer: '20',
        explanation: '(4,800 − 4,000) ÷ 4,000 = 0.20 = 20%.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A budget shrinks from $50,000 to $42,500. What is the percent decrease?',
        answer: '15',
        explanation: '(50,000 − 42,500) ÷ 50,000 = 0.15 = 15%.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-measurement-5',
    subject: 'math',
    tier: 1,
    title: 'Area & Volume Unit Conversions',
    theme: 'Converting between square and cubic units',
    novaIntro: {
      concept: 'Converting square or cubic units (area and volume) requires squaring or cubing the linear conversion factor, not just using it directly — since area is two-dimensional and volume is three-dimensional.',
      example: 'Convert 3 square meters to square centimeters: since 1 m = 100 cm, 1 m² = 100² = 10,000 cm². So 3 m² = 30,000 cm².',
      connection: 'Calculating how much material covers a surface (area) or fills a container (volume) requires this exact squared or cubed conversion — a common and costly mistake for engineers who forget to square the factor.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Convert 3 square meters to square centimeters. (1 m² = 10,000 cm²)',
        answer: '30000',
        explanation: '3 × 10,000 = 30,000 cm².',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Convert 2 cubic meters to cubic centimeters. (1 m³ = 1,000,000 cm³)',
        answer: '2000000',
        explanation: '2 × 1,000,000 = 2,000,000 cm³.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Convert 5,000 square centimeters to square meters.',
        answer: '0.5',
        explanation: '5,000 ÷ 10,000 = 0.5 m².',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Convert 4,000,000 cubic centimeters to cubic meters.',
        answer: '4',
        explanation: '4,000,000 ÷ 1,000,000 = 4 m³.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-critical-thinking-4',
    subject: 'math',
    tier: 1,
    title: 'Real-World Decision Making IV',
    theme: 'More scheduling, budgeting, and comparison problems',
    novaIntro: {
      concept: 'More multi-step decision problems, now involving scheduling, budgeting, and minimum-requirement scenarios that require careful reading before any calculation begins.',
      example: 'A budget of $5,000 spends 40% on materials and 25% on labor. Remaining: 5,000 − 2,000 − 1,250 = $1,750.',
      connection: 'Reading a real engineering scenario carefully before calculating — making sure you understand exactly what’s being asked — is often more important than the math itself, since the wrong setup guarantees a wrong answer no matter how carefully you calculate.'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Prep starts at minute 0 and takes 38 minutes. The launch window opens at minute 45 and stays open until minute 90. Will prep finish before the window opens?',
        choices: [
          'Yes, prep finishes at minute 38, before the window opens at minute 45',
          'No, prep takes longer than the window allows',
          'Prep finishes exactly when the window opens',
          'Cannot be determined'
        ],
        answer: 0,
        explanation: 'Prep finishes at minute 38, which is before the window opens at minute 45.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A team has a $5,000 budget. They spend 40% on materials and 25% on labor. How much remains?',
        answer: '1750',
        explanation: 'Materials: 5000 × 0.40 = 2000. Labor: 5000 × 0.25 = 1250. Remaining: 5000 − 2000 − 1250 = 1750.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Vendor A costs $100/month with no minimum. Vendor B costs $130/month, but the first month is free. Which is cheaper over exactly 4 months?',
        choices: ['Vendor A', 'Vendor B', 'They cost the same', 'Cannot be determined'],
        answer: 1,
        explanation: 'Vendor A: 100 × 4 = $400. Vendor B: 130 × 3 (first month free) = $390. Vendor B is cheaper.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A budget review requires 4 approvals. So far 3 people have approved. How many more approvals are needed?',
        answer: '1',
        explanation: '4 − 3 = 1 more approval needed.',
        xp: 10
      }
    ]
  }
];
