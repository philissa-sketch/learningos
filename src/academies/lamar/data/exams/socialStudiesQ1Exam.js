// ---------------------------------------------------------------------------
// Social Studies Q1 2026-2027 Quarterly Cumulative Exam
//
// Same confirmed assessment framework as Aerospace's quarterly exams (see
// docs/PROJECT_LOG.md): 20-25 items, covering ONLY material actually taught
// in this quarter's 10 Mission-Control-built lessons — genealogy research
// methods, racial reclassification in historical records, evaluating
// historical evidence, and the two guided research investigations. This
// exam does NOT cover the parallel Khan Academy World History content
// (Early Agrarian Societies, Empires and Belief Systems, etc.) seeded in
// useAppStore.js — that content has no in-app quiz layer of its own (Khan
// Academy grades it directly), so it isn't testable here.
//
// ARCHITECTURE NOTE: same pattern as every other quarterly exam — no
// `novaIntro`, `isQuarterlyExam: true`, `unlocksAfter` listing all 10 real
// lesson ids so the Roster/gating logic requires them completed first.
//
// Format: 22 items (within the 20-25 range) — multiple-choice and
// true/false, roughly 2 questions per lesson, cumulative across the full
// quarter.
// ---------------------------------------------------------------------------

export const socialStudiesQ1Exam = {
  id: 'exam-socialStudies-q1-2026-2027',
  subject: 'socialStudies',
  tier: 1,
  // RE-QUARTERED Aug 6, 2026 at the parent's instruction: "I want Genealogy
  // to be in qtr 2 by itself." The `id` deliberately still says "q1" — a
  // lesson/exam id is the stable key every recorded attempt is stored
  // against, and renaming it would orphan real student progress. Only the
  // quarter and title move.
  quarter: 'Q2 2026-2027',
  title: 'Quarterly Exam — Genealogy, Historical Evidence & Guided Investigations (Q2)',
  theme: 'Cumulative exam covering Genealogy Research Methods, Racial Reclassification, Evaluating Historical Evidence, and the two Guided Investigations',
  isQuarterlyExam: true,
  unlocksAfter: [
    'ss7-genealogy-research-methods', 'ss7-genealogy-research-methods-2',
    'ss7-racial-reclassification-historical-records', 'ss7-racial-reclassification-historical-records-2',
    'ss7-evaluating-historical-evidence', 'ss7-evaluating-historical-evidence-2',
    'ss7-guided-investigation-indigenous-ancestry', 'ss7-guided-investigation-indigenous-ancestry-2',
    'ss7-guided-investigation-human-origins', 'ss7-guided-investigation-human-origins-2'
  ],
  questions: [
    {
      id: 'q1',
      type: 'choice',
      prompt: 'What is a primary source?',
      choices: [
        'A firsthand record created at or near the time of an event by someone with direct knowledge of it',
        'A textbook that summarizes what historians have concluded',
        'Any old document, regardless of who wrote it or when',
        'A movie based on a historical event'
      ],
      answer: 0,
      explanation: 'A primary source is a firsthand record created at or near the time of an event by someone with direct knowledge of it.',
      choiceFeedback: [null, 'That describes a SECONDARY source.', "Age alone doesn't make something a primary source.", 'A dramatized movie is not a primary source.'],
      xp: 10
    },
    {
      id: 'q2',
      type: 'choice',
      prompt: 'True or False: In the 1850 and 1860 census, enslaved people were listed by their own full name, just like everyone else.',
      choices: ['True', 'False'],
      answer: 1,
      explanation: 'False — enslaved people were listed only by age, sex, and color on a separate slave schedule, under the enslaver’s name, not by their own name.',
      choiceFeedback: ['This is a real, documented gap in the record — the statement as written is False.', null],
      xp: 10
    },
    {
      id: 'q3',
      type: 'choice',
      prompt: "What made the 1870 census a genealogical turning point?",
      choices: [
        'It was the first census to list every formerly enslaved individual by their own actual name',
        'It was the first census taken using photographs',
        'It was the first census conducted entirely online',
        'It was the first census that only counted adult men'
      ],
      answer: 0,
      explanation: 'The 1870 census was the first to list all formerly enslaved individuals by their own names.',
      choiceFeedback: [null, 'Census records in this era were handwritten, not photographed.', 'Online census-taking is over a century later.', 'The census counted entire households, not just adult men.'],
      xp: 10
    },
    {
      id: 'q4',
      type: 'choice',
      prompt: "What was the Freedmen's Bureau's full official name, and when was it created?",
      choices: [
        'The Bureau of Refugees, Freedmen, and Abandoned Lands, created in March 1865',
        'The Department of Reconstruction, created in 1619',
        'The National Freedom Administration, created in 1900',
        'The Emancipation Records Office, created after World War II'
      ],
      answer: 0,
      explanation: "The Freedmen's Bureau's full name was the Bureau of Refugees, Freedmen, and Abandoned Lands, created in March 1865.",
      choiceFeedback: [null, '1619 is centuries too early.', '1900 is decades too late — this was a Reconstruction-era agency.', 'This predates World War II by nearly a century.'],
      xp: 10
    },
    {
      id: 'q5',
      type: 'choice',
      prompt: 'What racial category did the U.S. census use specifically for mixed-race individuals from 1850 through 1930?',
      choices: ['"Mulatto"', '"Freedman"', '"Creole"', '"Indian"'],
      answer: 0,
      explanation: 'The census used "Mulatto" for mixed-race individuals from 1850 through 1930.',
      choiceFeedback: [null, '"Freedman" described someone freed from slavery, not a racial category.', '"Creole" was never an official census category.', '"Indian" was a separate category for Native Americans.'],
      xp: 10
    },
    {
      id: 'q6',
      type: 'choice',
      prompt: 'True or False: Starting in 1930, the census eliminated "Mulatto" and formally instructed enumerators to record anyone with any known Black ancestry as "Negro," regardless of the actual fraction — the "one-drop rule."',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — this is a real, documented 1930 policy change, formalizing the one-drop rule.',
      choiceFeedback: [null, 'This is a real, documented policy change — the statement is True.'],
      xp: 10
    },
    {
      id: 'q7',
      type: 'choice',
      prompt: "What did Virginia's Racial Integrity Act of 1924 require?",
      choices: [
        'It reclassified all Virginians as either "white" or "colored" on official state records',
        'It required every Virginian to take a literacy test before voting',
        'It gave every Virginian the right to choose their own race on official documents',
        'It applied only to marriage licenses and nothing else'
      ],
      answer: 0,
      explanation: 'The Racial Integrity Act required every Virginian to be classified as either "white" or "colored" on official records.',
      choiceFeedback: [null, 'Literacy tests were a separate voting restriction.', 'This is the opposite of what the law did.', "The Act's classification requirement applied broadly to vital records."],
      xp: 10
    },
    {
      id: 'q8',
      type: 'choice',
      prompt: 'Who was Walter Plecker, and what long-term effect did his reclassification campaign have?',
      choices: [
        "Virginia's registrar of the Bureau of Vital Statistics, who ordered many Virginia Indians reclassified as \"colored\" — six Virginia tribes weren't federally recognized until 2018 as a result",
        'A Virginia Indian tribal chief who led resistance to the Racial Integrity Act, with no lasting effect on tribal recognition',
        'A U.S. Supreme Court justice who struck down the Racial Integrity Act in 1900',
        'A federal census enumerator with no connection to Virginia state law or any lasting effect'
      ],
      answer: 0,
      explanation: "Plecker was Virginia's registrar of vital statistics; his reclassification campaign corrupted decades of records, delaying six Virginia tribes' federal recognition until 2018.",
      choiceFeedback: [null, 'Plecker was not a tribal leader — he enforced the Act, causing real lasting harm.', 'The Supreme Court case (Loving v. Virginia) was 1967, not 1900, and Plecker enforced rather than struck down the law.', "Plecker held a Virginia state office, and his campaign had a real, documented long-term effect."],
      xp: 10
    },
    {
      id: 'q9',
      type: 'choice',
      prompt: 'What does it mean to "corroborate" a historical claim?',
      choices: [
        'To confirm it using multiple independent sources, not just one',
        'To only trust whichever source is the most recently written',
        'To accept it if it sounds believable',
        'To ask a single expert to confirm it'
      ],
      answer: 0,
      explanation: 'Corroboration means confirming a claim using multiple independent sources.',
      choiceFeedback: [null, "A source's age alone says nothing about reliability.", 'How believable a claim sounds is not evidence.', 'A single opinion is still just one source.'],
      xp: 10
    },
    {
      id: 'q10',
      type: 'choice',
      prompt: "What real, documented bias affected many WPA slave narrative interviews (1936-1938)?",
      choices: [
        "Interviewers were almost all white southerners (some even family members of former enslavers), and the era's racial etiquette likely caused some self-censorship",
        'The interviews were conducted entirely by formerly enslaved people themselves',
        'The interviews were all conducted by mail, with no direct human contact',
        'There is no documented bias concern with this collection at all'
      ],
      answer: 0,
      explanation: 'Historians have documented that interviewers were almost all white southerners, and social pressures likely caused some self-censorship.',
      choiceFeedback: [null, 'This is the opposite of the real, documented issue.', 'These were in-person interviews.', 'Historians have documented real, specific bias concerns.'],
      xp: 10
    },
    {
      id: 'q11',
      type: 'choice',
      prompt: 'What was the "Dunning School" of Reconstruction history, and how did W.E.B. Du Bois challenge it?',
      choices: [
        'An early-20th-century view blaming Black political participation for Reconstruction\'s "failure"; Du Bois\'s 1935 "Black Reconstruction in America" reversed that premise and introduced the self-emancipation theory',
        'A literal school Freedmen\'s Bureau ran during Reconstruction; Du Bois built a rival school in response',
        'A 21st-century view written by Du Bois himself, later challenged by earlier historians',
        'A term with no real historical meaning'
      ],
      answer: 0,
      explanation: "The Dunning School was a dominant, biased academic interpretation; Du Bois's 1935 work reversed its premise and introduced self-emancipation.",
      choiceFeedback: [null, '"Dunning School" refers to a school of THOUGHT, not a literal school building.', 'This has the chronology backwards — the Dunning School came first.', 'This is a real, well-documented historiographical episode.'],
      xp: 10
    },
    {
      id: 'q12',
      type: 'choice',
      prompt: 'What does "cross-referencing" mean in genealogy research?',
      choices: [
        'Comparing multiple different types of records against each other to confirm, extend, or question a claim',
        'Reading the same single document multiple times to memorize it',
        'Choosing whichever single record looks the oldest and trusting only that one',
        'Translating a record into a different language'
      ],
      answer: 0,
      explanation: 'Cross-referencing means comparing multiple different types of records against each other.',
      choiceFeedback: [null, 'This involves comparing MULTIPLE sources, not re-reading one.', 'This is the opposite of cross-referencing.', "Cross-referencing isn't about translation."],
      xp: 10
    },
    {
      id: 'q13',
      type: 'choice',
      prompt: 'True or False: The "Cherokee grandmother" family legend is documented as having become common among white Southern families first, in the 1840s-1850s, not as a story unique to Black American families.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — this is a documented, widespread American family legend pattern, not unique to any one group.',
      choiceFeedback: [null, 'This is a real, documented historical pattern — the statement is True.'],
      xp: 10
    },
    {
      id: 'q14',
      type: 'choice',
      prompt: 'What is the real, documented history of the Five Civilized Tribes and Freedmen?',
      choices: [
        'Some of the Five Tribes held Black people as enslaved property; the Cherokee Nation freed enslaved people in 1863 (Cherokee Freedmen), and nearly 20,000 Freedmen across the Five Tribes were recorded on the Dawes Rolls (1898-1914)',
        'The Five Civilized Tribes never practiced slavery of any kind',
        'Freedmen were recorded only in a single private family diary, with no federal record at all',
        'This history was entirely invented in the 21st century'
      ],
      answer: 0,
      explanation: 'This is real, well-documented history: Cherokee Freedmen (1863) and nearly 20,000 Freedmen recorded on the Dawes Rolls across the Five Tribes.',
      choiceFeedback: [null, 'This is real, documented history.', 'Real federal records — the Dawes Rolls — document this history.', 'This history dates to the 1800s and early 1900s, not a modern invention.'],
      xp: 10
    },
    {
      id: 'q15',
      type: 'choice',
      prompt: 'What did the Dawes Commission often do when enrolling people who had any visible African ancestry, even those who also had real Cherokee ancestry?',
      choices: [
        'It often listed them entirely on the Freedmen roll, based on visible appearance, rather than accurately recording their actual Cherokee ancestry',
        'It carefully and accurately recorded each person\'s exact percentage of Cherokee ancestry in every case',
        'It refused to enroll anyone with any African ancestry at all',
        "It used DNA testing to verify everyone's ancestry before enrollment"
      ],
      answer: 0,
      explanation: "The Commission generally sorted by visible appearance rather than accurately recording actual Cherokee ancestry — a real, documented bias even in this official record.",
      choiceFeedback: [null, 'This is the opposite of the documented reality.', 'People with African ancestry WERE enrolled, on the Freedmen roll.', 'DNA testing did not exist during this enrollment period (1898-1914).'],
      xp: 10
    },
    {
      id: 'q16',
      type: 'choice',
      prompt: "What's the responsible, evidence-based way to approach a specific family's Native American ancestry claim?",
      choices: [
        'Investigate it using real records (tribal rolls, census records, DNA testing) without assuming the answer is true or false in advance',
        'Always assume every such claim is true without checking any evidence',
        'Always assume every such claim is false without checking any evidence',
        'Never investigate it, since the answer can never be known'
      ],
      answer: 0,
      explanation: 'The responsible approach investigates the specific family using real evidence, without assuming the conclusion in advance.',
      choiceFeedback: [null, 'Assuming automatic truth without evidence is not responsible.', 'Assuming automatic falseness is not responsible either — some such claims are well-documented and true.', 'Real, checkable evidence exists for this kind of question.'],
      xp: 10
    },
    {
      id: 'q17',
      type: 'choice',
      prompt: 'What does the "Out-of-Africa" model of human origins propose, and what genetic evidence supports it?',
      choices: [
        'That Homo sapiens evolved in Africa and spread worldwide, supported by mitochondrial DNA tracing all living humans back to a woman in Africa ("Mitochondrial Eve") roughly 200,000 years ago',
        'That humans evolved independently on every continent, supported by identical DNA found in every population',
        'That humans have always existed everywhere, with no genetic evidence involved at all',
        'That Homo sapiens evolved in Asia and migrated to Africa, supported by Y-chromosome studies'
      ],
      answer: 0,
      explanation: 'Out-of-Africa proposes an African origin, supported by mitochondrial DNA evidence pointing to "Mitochondrial Eve."',
      choiceFeedback: [null, 'This describes the MULTIREGIONAL hypothesis, the rejected competing model.', 'This is a genuine, evidence-based scientific question, not one lacking evidence.', 'The evidence points the opposite direction — an African origin with worldwide migration.'],
      xp: 10
    },
    {
      id: 'q18',
      type: 'choice',
      prompt: 'True or False: The multiregional hypothesis is now the dominant scientific consensus, having replaced the Out-of-Africa model.',
      choices: ['True', 'False'],
      answer: 1,
      explanation: 'False — the Out-of-Africa model is the dominant consensus; the multiregional hypothesis is now rejected by most of the scientific community.',
      choiceFeedback: ['This has the real situation backwards — the statement as written is False.', null],
      xp: 10
    },
    {
      id: 'q19',
      type: 'choice',
      prompt: 'What did the 2010 Neanderthal genome comparison reveal, and about what percentage of Neanderthal DNA do people of non-African descent typically carry?',
      choices: [
        'That Neanderthals and modern humans had interbred; about 2% of the genome in people of non-African descent',
        'That Neanderthals and modern humans share no genetic connection; 0%',
        'That Neanderthals never existed; this question has no real answer',
        'That all modern humans are genetically identical to Neanderthals; about 99%'
      ],
      answer: 0,
      explanation: 'The 2010 comparison confirmed real interbreeding; about 2% Neanderthal DNA in people of non-African descent.',
      choiceFeedback: [null, 'This is the opposite finding — real interbreeding was confirmed.', 'Neanderthals are a real, well-documented species.', 'This vastly overstates the real figure of about 2%.'],
      xp: 10
    },
    {
      id: 'q20',
      type: 'choice',
      prompt: 'What are Denisovans, and which modern population carries the highest known percentage of Denisovan DNA?',
      choices: [
        'A previously unknown hominin group identified from a Siberian fossil finger bone; modern Melanesians carry the highest known percentage (about 4-6%)',
        'Another name for Neanderthals; modern Europeans carry the highest percentage',
        'A modern ethnic group living in Siberia today; no modern population carries any',
        'A hominin group discovered in the 1800s; every population carries an equal percentage'
      ],
      answer: 0,
      explanation: 'Denisovans are a distinct hominin group; modern Melanesians carry the highest known Denisovan DNA percentage.',
      choiceFeedback: [null, 'Denisovans are a genuinely different, distinct group from Neanderthals.', 'Denisovans were an ancient hominin group, not a modern ethnic group.', 'Denisovans were identified through modern ancient-DNA sequencing, not discovered in the 1800s.'],
      xp: 10
    },
    {
      id: 'q21',
      type: 'choice',
      prompt: 'Does the discovery of Neanderthal and Denisovan DNA in modern humans mean the multiregional hypothesis was correct after all?',
      choices: [
        'No — scientists consider it a refinement of the Out-of-Africa model, not a reversal, since modern humans still trace their primary origin to Africa',
        'Yes — this discovery completely reversed scientific opinion back to the multiregional hypothesis',
        'Yes — it proves humans evolved independently in Europe and Asia with no African origin at all',
        'No — because this discovery has since been fully disproven and retracted'
      ],
      answer: 0,
      explanation: 'Scientists consider this a refinement of Out-of-Africa, not a reversal.',
      choiceFeedback: [null, 'Scientists specifically describe this as a refinement, not a reversal.', 'This overstates the finding.', 'This discovery has not been disproven or retracted.'],
      xp: 10
    },
    {
      id: 'q22',
      type: 'choice',
      prompt: 'What connects the corroboration/bias-evaluation skills from this quarter to BOTH guided investigations (family ancestry claims and human origins)?',
      choices: [
        'Both investigations required following the actual documentary or genetic evidence for a real, specific question, rather than assuming the answer in advance based on which explanation felt more appealing',
        'The two investigations have no real connection to each other or to the earlier lessons',
        'Both investigations proved that evidence never actually resolves a real debate',
        'Both investigations concluded that no real answer exists to either question'
      ],
      answer: 0,
      explanation: 'Both investigations applied the same core method: following actual evidence for a specific, real question, without assuming the conclusion in advance.',
      choiceFeedback: [null, 'There is a real, direct connection — both apply the same evidence-based investigative method built across this whole quarter.', 'Both examples specifically show that evidence DOES matter and DOES help resolve real questions.', 'Both investigations reached real, evidence-based conclusions (or honest inconclusive results), not a claim that no answer ever exists.'],
      xp: 10
    }
  ]
};
