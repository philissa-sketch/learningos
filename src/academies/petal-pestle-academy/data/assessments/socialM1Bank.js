// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 1 BANK — 40 questions, ten per lesson.
//
// ---- THE RULE THAT MADE THIS FILE HARD, AND IT IS GIGI'S ----
//
// "THE RIGHT ANSWER HAS TO MOVE AROUND." The Science Lab's first bank had 42 of
// 60 answers in slot B and none at all in slot D, which teaches a child to
// guess a position instead of think. check-sciencelab fails the build if any
// slot holds over 40% or is never used, measured PER MODULE and across a whole
// course.
//
// This module is 10/10/10/10. Per lesson: 3/3/2/2, 2/2/3/3, 3/2/3/2, 2/3/2/3.
//
// ---- THE READING CAP ----
//
// Quarter 1: eleven words a sentence, and no more than 6% long words. Every
// prompt and choice here is written to that, and check-assessment measures it
// per course so this module cannot hide inside Herbalism's average.
//
// Exactly one feedback entry per question is null, and it sits on the answer.
// ---------------------------------------------------------------------------

export const SOCIAL_M1_BANK = [
  // ---- ss-m1-01 · The war that came with a bill (3/3/2/2) ----
  {
    id: 'ss-m1-01-q1',
    lesson: 'ss-m1-01',
    prompt: 'Britain fought a long war in America against:',
    choices: ['France', 'Spain', 'Russia', 'Italy'],
    answer: 0,
    feedback: [null, 'Spain was not the enemy here.', 'Russia was far away.', 'Italy was not involved.'],
    why: 'Britain and France fought over land in America.'
  },
  {
    id: 'ss-m1-01-q2',
    lesson: 'ss-m1-01',
    prompt: 'Winning the war left Britain with a huge:',
    choices: ['Debt', 'Fleet', 'Harvest', 'Crown'],
    answer: 0,
    feedback: [null, 'Ships were not the problem.', 'Food was not the problem.', 'The crown did not change.'],
    why: 'Wars cost money, and Britain owed a great deal.'
  },
  {
    id: 'ss-m1-01-q3',
    lesson: 'ss-m1-01',
    prompt: 'A colony is a place that is:',
    choices: ['Ruled by a country far away', 'Always an island', 'Free of all laws', 'Under the sea'],
    answer: 0,
    feedback: [null, 'Many colonies are not islands.', 'Colonies had plenty of laws.', 'That is not what it means.'],
    why: 'The ruler is somewhere else. That is the whole idea.'
  },
  {
    id: 'ss-m1-01-q4',
    lesson: 'ss-m1-01',
    prompt: 'The Stamp Act of 1765 taxed:',
    choices: ['Tea', 'Paper', 'Shoes', 'Bread'],
    answer: 1,
    feedback: ['Tea came later.', null, 'Shoes were not taxed.', 'Bread was not taxed.'],
    why: 'Newspapers, letters and playing cards all cost more.'
  },
  {
    id: 'ss-m1-01-q5',
    lesson: 'ss-m1-01',
    prompt: 'A tax is money that:',
    choices: ['A shop gives back', 'A government makes people pay', 'A bank saves', 'A friend lends'],
    answer: 1,
    feedback: ['Shops do not give tax back.', null, 'Saving is not taxing.', 'A loan is not a tax.'],
    why: 'It is not a choice. That is what makes it a tax.'
  },
  {
    id: 'ss-m1-01-q6',
    lesson: 'ss-m1-01',
    prompt: 'To represent someone means to:',
    choices: ['Draw them', 'Speak for them', 'Pay them', 'Follow them'],
    answer: 1,
    feedback: ['That is a picture, not a voice.', null, 'Paying is not speaking.', 'Following is not speaking.'],
    why: 'The colonists had nobody speaking for them in Britain.'
  },
  {
    id: 'ss-m1-01-q7',
    lesson: 'ss-m1-01',
    prompt: 'The colonists complained most about having no:',
    choices: ['Ships', 'Farms', 'Say in the taxes', 'Warm clothes'],
    answer: 2,
    feedback: ['Ships were not the issue.', 'Farms were not the issue.', null, 'Clothing was not the issue.'],
    why: 'Their words were: no taxation without representation.'
  },
  {
    id: 'ss-m1-01-q8',
    lesson: 'ss-m1-01',
    prompt: 'Britain taxed the colonies mainly to:',
    choices: ['Punish them', 'Make them leave', 'Help pay the war debt', 'Build a palace'],
    answer: 2,
    feedback: ['Punishment was not the aim.', 'Britain wanted them to stay.', null, 'No palace was planned.'],
    why: 'The taxes were the bill for a war Britain had won.'
  },
  {
    id: 'ss-m1-01-q9',
    lesson: 'ss-m1-01',
    prompt: 'Debt means money that you:',
    choices: ['Found', 'Gave away', 'Burned', 'Owe'],
    answer: 3,
    feedback: ['Found money is not owed.', 'Giving is not owing.', 'That is not what it means.', null],
    why: 'Britain owed a huge amount after the war.'
  },
  {
    id: 'ss-m1-01-q10',
    lesson: 'ss-m1-01',
    prompt: 'The war Britain fought in America ended with Britain:',
    choices: ['Losing all its land', 'Leaving America', 'Ruled by France', 'Winning and in debt'],
    answer: 3,
    feedback: ['Britain gained land.', 'Britain stayed.', 'France did not rule Britain.', null],
    why: 'Both are true at once, and that is the whole lesson.'
  },

  // ---- ss-m1-02 · The people who refused (2/2/3/3) ----
  {
    id: 'ss-m1-02-q1',
    lesson: 'ss-m1-02',
    prompt: 'A boycott means to:',
    choices: ['Refuse to buy something', 'Buy two of something', 'Sell something twice', 'Hide something'],
    answer: 0,
    feedback: [null, 'That is the opposite.', 'Selling is not refusing.', 'Hiding is not refusing.'],
    why: 'It only works when many people do it at once.'
  },
  {
    id: 'ss-m1-02-q2',
    lesson: 'ss-m1-02',
    prompt: 'The group that organised protests was called the:',
    choices: ['Sons of Liberty', 'Kings of Boston', 'Ships of Freedom', 'Farmers of Concord'],
    answer: 0,
    feedback: [null, 'No such group.', 'No such group.', 'No such group.'],
    why: 'They organised the protests in the towns.'
  },
  {
    id: 'ss-m1-02-q3',
    lesson: 'ss-m1-02',
    prompt: 'The Daughters of Liberty wove cloth so they need not:',
    choices: ['Farm', 'Buy British cloth', 'Sail to Britain', 'Pay for bread'],
    answer: 1,
    feedback: ['Weaving is not farming.', null, 'No sailing was needed.', 'Bread was not the point.'],
    why: 'Making your own is how you keep a boycott going.'
  },
  {
    id: 'ss-m1-02-q4',
    lesson: 'ss-m1-02',
    prompt: 'The Boston Massacre happened in the year:',
    choices: ['1765', '1770', '1773', '1775'],
    answer: 1,
    feedback: ['That was the Stamp Act.', null, 'That was the Tea Party.', 'That was Lexington.'],
    why: 'A crowd met soldiers in Boston and five people died.'
  },
  {
    id: 'ss-m1-02-q5',
    lesson: 'ss-m1-02',
    prompt: 'At the Boston Tea Party the tea was:',
    choices: ['Drunk', 'Sold', 'Thrown in the harbour', 'Sent back'],
    answer: 2,
    feedback: ['They refused to drink it.', 'Selling would be theft.', null, 'It was destroyed, not returned.'],
    why: 'Destroying it said the tax would not be paid at all.'
  },
  {
    id: 'ss-m1-02-q6',
    lesson: 'ss-m1-02',
    prompt: 'The Boston Tea Party happened in the year:',
    choices: ['1765', '1770', '1773', '1781'],
    answer: 2,
    feedback: ['That was the Stamp Act.', 'That was the Massacre.', null, 'That was Yorktown.'],
    why: 'Three years after the Boston Massacre.'
  },
  {
    id: 'ss-m1-02-q7',
    lesson: 'ss-m1-02',
    prompt: 'A protest is when people say loudly that something is:',
    choices: ['Cheap', 'Old', 'Wrong', 'Far'],
    answer: 2,
    feedback: ['Price is not the point.', 'Age is not the point.', null, 'Distance is not the point.'],
    why: 'A protest is a complaint made in public.'
  },
  {
    id: 'ss-m1-02-q8',
    lesson: 'ss-m1-02',
    prompt: 'One person refusing to buy tea would:',
    choices: ['Stop all trade', 'Change the law', 'End the war', 'Change almost nothing'],
    answer: 3,
    feedback: ['One person cannot.', 'One person cannot.', 'One person cannot.', null],
    why: 'A boycott needs numbers. That is why they organised.'
  },
  {
    id: 'ss-m1-02-q9',
    lesson: 'ss-m1-02',
    prompt: 'Liberty means being free to:',
    choices: ['Buy anything', 'Travel by sea', 'Win a fight', 'Choose for yourself'],
    answer: 3,
    feedback: ['Money is not liberty.', 'Travel is not liberty.', 'Winning is not liberty.', null],
    why: 'That is why both groups took the name.'
  },
  {
    id: 'ss-m1-02-q10',
    lesson: 'ss-m1-02',
    prompt: 'The Daughters of Liberty are best remembered for:',
    choices: ['Sailing ships', 'Writing laws', 'Leading the army', 'Running the boycotts'],
    answer: 3,
    feedback: ['They did not sail.', 'They did not write laws.', 'They did not lead it.', null],
    why: 'They wove their own cloth to keep the boycott alive.'
  },

  // ---- ss-m1-03 · Who was on which side (3/2/3/2) ----
  {
    id: 'ss-m1-03-q1',
    lesson: 'ss-m1-03',
    prompt: 'The patriot army was led by:',
    choices: ['George Washington', 'Paul Revere', 'King George III', 'Thomas Jefferson'],
    answer: 0,
    feedback: [null, 'He carried a warning.', 'He ruled Britain.', 'He wrote the Declaration.'],
    why: 'He kept an army together for years.'
  },
  {
    id: 'ss-m1-03-q2',
    lesson: 'ss-m1-03',
    prompt: 'A patriot was a colonist who wanted to:',
    choices: ['Break away from Britain', 'Stay with Britain', 'Move to France', 'Join the navy'],
    answer: 0,
    feedback: [null, 'That was a loyalist.', 'France was an ally, not a home.', 'That is not the meaning.'],
    why: 'Patriot and loyalist are the two sides of the same choice.'
  },
  {
    id: 'ss-m1-03-q3',
    lesson: 'ss-m1-03',
    prompt: 'A loyalist was a colonist who stayed on the side of:',
    choices: ['Britain', 'France', 'Spain', 'Nobody'],
    answer: 0,
    feedback: [null, 'France helped the patriots.', 'Spain was not the choice.', 'They did choose.'],
    why: 'Loyal to the king. That is where the name comes from.'
  },
  {
    id: 'ss-m1-03-q4',
    lesson: 'ss-m1-03',
    prompt: 'Benjamin Franklin helped most by getting help from:',
    choices: ['Spain', 'France', 'Russia', 'Italy'],
    answer: 1,
    feedback: ['Spain was not his errand.', null, 'Russia did not join.', 'Italy did not join.'],
    why: 'French help mattered enormously to the patriot side.'
  },
  {
    id: 'ss-m1-03-q5',
    lesson: 'ss-m1-03',
    // REWORDED, NOT EXEMPTED. The first version read "Benedict Arnold is
    // remembered because he:" — six words carrying two long ones, 33% against a
    // Quarter 1 cap of 6%. "Benedict" and "remembered" are not taught by name in
    // any lesson of this course, so neither earns the derived exemption. The
    // name moved into the choices, where it belongs and is not measured.
    prompt: 'Who fought for one side and then joined the other?',
    choices: ['Paul Revere', 'Benedict Arnold', 'John Adams', 'Patrick Henry'],
    answer: 1,
    feedback: ['He rode with a warning.', null, 'He stayed a patriot.', 'He stayed a patriot.'],
    why: 'His name still means traitor.'
  },
  {
    id: 'ss-m1-03-q6',
    lesson: 'ss-m1-03',
    prompt: 'The 1st Rhode Island Regiment was made up largely of:',
    choices: ['British officers', 'French sailors', 'Black and Native soldiers', 'Spanish traders'],
    answer: 2,
    feedback: ['They were not British.', 'They were not French.', null, 'They were not Spanish.'],
    why: 'It is the best known Black regiment of the war.'
  },
  {
    id: 'ss-m1-03-q7',
    lesson: 'ss-m1-03',
    prompt: 'Some Black soldiers joined the war because they were promised:',
    choices: ['Gold', 'Land in Britain', 'Freedom', 'A ship'],
    answer: 2,
    feedback: ['Gold was not the offer.', 'Land was not the offer.', null, 'A ship was not the offer.'],
    why: 'Both sides made that promise, and both often broke it.'
  },
  {
    id: 'ss-m1-03-q8',
    lesson: 'ss-m1-03',
    prompt: 'Black soldiers in this war fought:',
    choices: ['Only for Britain', 'Only for the patriots', 'On both sides', 'Not at all'],
    answer: 2,
    feedback: ['Not only for Britain.', 'Not only for the patriots.', null, 'Thousands fought.'],
    why: 'Both sides recruited them, and both made promises.'
  },
  {
    id: 'ss-m1-03-q9',
    lesson: 'ss-m1-03',
    prompt: 'Paul Revere is remembered for:',
    choices: ['Leading the army', 'Ruling Britain', 'Writing the laws', 'Riding with a warning'],
    answer: 3,
    feedback: ['Washington led it.', 'That was King George III.', 'That was not his part.', null],
    why: 'Riders went ahead of the soldiers to warn the towns.'
  },
  {
    id: 'ss-m1-03-q10',
    lesson: 'ss-m1-03',
    prompt: 'A regiment is a large group of:',
    choices: ['Farmers', 'Ships', 'Letters', 'Soldiers'],
    answer: 3,
    feedback: ['Not farmers by definition.', 'Ships form a fleet.', 'Letters are not a regiment.', null],
    why: 'They serve together under the same officers.'
  },

  // ---- ss-m1-04 · The morning the shooting started (2/3/2/3) ----
  {
    id: 'ss-m1-04-q1',
    lesson: 'ss-m1-04',
    prompt: 'The British marched to Concord to take the militia’s:',
    choices: ['Supplies', 'Horses', 'Bread', 'Boats'],
    answer: 0,
    feedback: [null, 'Horses were not the errand.', 'Food was not the errand.', 'Boats were not there.'],
    why: 'An army without powder cannot fight.'
  },
  {
    id: 'ss-m1-04-q2',
    lesson: 'ss-m1-04',
    prompt: 'A militia is made up of:',
    choices: ['Ordinary people who train to fight', 'Paid British officers', 'Sailors from France', 'Kings and lords'],
    answer: 0,
    feedback: [null, 'They were not British.', 'They were not sailors.', 'They were not lords.'],
    why: 'Farmers and shopkeepers who trained on the town green.'
  },
  {
    id: 'ss-m1-04-q3',
    lesson: 'ss-m1-04',
    prompt: 'Lexington and Concord happened in the year:',
    choices: ['1765', '1775', '1781', '1787'],
    answer: 1,
    feedback: ['That was the Stamp Act.', null, 'That was Yorktown.', 'That was the Constitution.'],
    why: 'April 1775, and the war began that morning.'
  },
  {
    id: 'ss-m1-04-q4',
    lesson: 'ss-m1-04',
    prompt: 'Riders went ahead of the soldiers in order to:',
    choices: ['Sell news', 'Warn the towns', 'Carry tea', 'Draw maps'],
    answer: 1,
    feedback: ['They were not selling.', null, 'No tea was carried.', 'No maps were drawn.'],
    why: 'Paul Revere was one of those riders.'
  },
  {
    id: 'ss-m1-04-q5',
    lesson: 'ss-m1-04',
    prompt: 'To retreat means to:',
    choices: ['Charge ahead', 'Go back the way you came', 'Stand still', 'Sail away'],
    answer: 1,
    feedback: ['That is the opposite.', null, 'Standing still is not retreating.', 'No ships were used.'],
    why: 'The British went back to Boston that afternoon.'
  },
  {
    id: 'ss-m1-04-q6',
    lesson: 'ss-m1-04',
    prompt: 'The militia fired at the British from behind:',
    choices: ['Ships', 'Trees only', 'Walls and cover', 'The sea'],
    answer: 2,
    feedback: ['No ships were there.', 'Walls too, not just trees.', null, 'The sea was behind Boston.'],
    why: 'The road home gave the soldiers nowhere to hide.'
  },
  {
    id: 'ss-m1-04-q7',
    lesson: 'ss-m1-04',
    prompt: 'By the end of that day the British were:',
    choices: ['Marching on', 'Crowning a king', 'Retreating', 'Signing a treaty'],
    answer: 2,
    feedback: ['They turned around.', 'No king was crowned.', null, 'No treaty was signed.'],
    why: 'They went back to Boston under fire the whole way.'
  },
  {
    id: 'ss-m1-04-q8',
    lesson: 'ss-m1-04',
    prompt: 'Who fired the first shot at Lexington?',
    choices: ['The militia', 'The British', 'Paul Revere', 'Nobody knows'],
    answer: 3,
    feedback: ['Each side blamed the other.', 'Each side blamed the other.', 'He carried a warning.', null],
    why: 'No one can prove it, and both sides said it was the other.'
  },
  {
    id: 'ss-m1-04-q9',
    lesson: 'ss-m1-04',
    prompt: 'Supplies for an army means things like:',
    choices: ['Music and flags', 'Gold and jewels', 'Songs and stories', 'Food, powder and tools'],
    answer: 3,
    feedback: ['Not what an army runs on.', 'Not what an army runs on.', 'Not what an army runs on.', null],
    why: 'Taking them was the whole reason for the march.'
  },
  {
    id: 'ss-m1-04-q10',
    lesson: 'ss-m1-04',
    prompt: 'Lexington and Concord matter because they were the:',
    choices: ['End of the war', 'Last British win', 'Day the tea was taxed', 'Start of the war'],
    answer: 3,
    feedback: ['The war had just begun.', 'It was not a British win.', 'That was earlier.', null],
    why: 'The arguing turned into shooting that morning.'
  }
];

export default SOCIAL_M1_BANK;
