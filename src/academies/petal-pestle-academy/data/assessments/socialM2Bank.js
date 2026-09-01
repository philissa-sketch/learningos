// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 2 BANK — 40 questions, ten per lesson.
//
// 10/10/10/10 across the module. Per lesson 3/3/2/2, 2/2/3/3, 3/2/3/2, 2/3/2/3.
// Quarter 1 reading cap: eleven words a sentence, 6% long words, measured per
// course so this module cannot hide inside another course's average.
//
// Exactly one feedback entry per question is null, and it sits on the answer.
// ---------------------------------------------------------------------------

export const SOCIAL_M2_BANK = [
  // ---- ss-m2-01 · The paper that said why (3/3/2/2) ----
  {
    id: 'ss-m2-01-q1',
    lesson: 'ss-m2-01',
    prompt: 'Most of the Declaration is a list of:',
    choices: ['Things the king did wrong', 'Battles won', 'Names of ships', 'Prices of goods'],
    answer: 0,
    feedback: [null, 'It is not a battle list.', 'No ships are listed.', 'It is not about prices.'],
    why: 'It says exactly what King George III had done.'
  },
  {
    id: 'ss-m2-01-q2',
    lesson: 'ss-m2-01',
    prompt: 'To declare something means to:',
    choices: ['Say it out loud and mean it', 'Hide it', 'Forget it', 'Sell it'],
    answer: 0,
    feedback: [null, 'That is the opposite.', 'That is the opposite.', 'That is not the meaning.'],
    why: 'They wrote it down so nobody could pretend later.'
  },
  {
    id: 'ss-m2-01-q3',
    lesson: 'ss-m2-01',
    prompt: 'Natural rights are rights a person:',
    choices: ['Is born with', 'Buys', 'Wins in war', 'Votes for'],
    answer: 0,
    feedback: [null, 'They are not for sale.', 'Winning does not create them.', 'A vote does not.'],
    why: 'If a king could give them, a king could take them.'
  },
  {
    id: 'ss-m2-01-q4',
    lesson: 'ss-m2-01',
    prompt: 'The Declaration was signed in the year:',
    choices: ['1765', '1776', '1781', '1787'],
    answer: 1,
    feedback: ['That was the Stamp Act.', null, 'That was Yorktown.', 'That was the convention.'],
    why: 'July 1776, a year after the fighting began.'
  },
  {
    id: 'ss-m2-01-q5',
    lesson: 'ss-m2-01',
    prompt: 'Most of the Declaration was written by:',
    choices: ['Paul Revere', 'Thomas Jefferson', 'King George III', 'John Adams'],
    answer: 1,
    feedback: ['He rode with a warning.', null, 'He was the one complained about.', 'He helped, but did not write it.'],
    why: 'Others changed it before it was signed.'
  },
  {
    id: 'ss-m2-01-q6',
    lesson: 'ss-m2-01',
    prompt: 'Fighting in the war began:',
    choices: ['After the Declaration', 'Before the Declaration', 'In 1787', 'In 1781'],
    answer: 1,
    feedback: ['The other way round.', null, 'That was the convention.', 'That was Yorktown.'],
    why: 'April 1775 was the fighting. July 1776 was the paper.'
  },
  {
    id: 'ss-m2-01-q7',
    lesson: 'ss-m2-01',
    prompt: 'The three rights the Declaration names are life, liberty and the:',
    choices: ['Right to a farm', 'Right to a horse', 'Pursuit of happiness', 'Right to a ship'],
    answer: 2,
    feedback: ['Not in the paper.', 'Not in the paper.', null, 'Not in the paper.'],
    why: 'Those three words are quoted more than any others in it.'
  },
  {
    id: 'ss-m2-01-q8',
    lesson: 'ss-m2-01',
    prompt: 'Tyranny means ruling:',
    choices: ['Kindly', 'By vote', 'By force, with no limits', 'By luck'],
    answer: 2,
    feedback: ['That is the opposite.', 'A vote is a limit.', null, 'Luck does not rule.'],
    why: 'The Declaration says the king had crossed that line.'
  },
  {
    id: 'ss-m2-01-q9',
    lesson: 'ss-m2-01',
    prompt: 'The Declaration says all men are created:',
    choices: ['Rich', 'Strong', 'Clever', 'Equal'],
    answer: 3,
    feedback: ['Not the word.', 'Not the word.', 'Not the word.', null],
    why: 'Equal means nobody is above by birth.'
  },
  {
    id: 'ss-m2-01-q10',
    lesson: 'ss-m2-01',
    prompt: 'A right you are born with cannot be taken by a:',
    choices: ['Neighbour', 'Teacher', 'Friend', 'King'],
    answer: 3,
    feedback: ['Not the point being made.', 'Not the point being made.', 'Not the point being made.', null],
    why: 'That is the whole argument the paper makes.'
  },

  // ---- ss-m2-02 · How the smaller army won (2/2/3/3) ----
  {
    id: 'ss-m2-02-q1',
    lesson: 'ss-m2-02',
    prompt: 'To surrender means to:',
    choices: ['Give up and stop fighting', 'Attack again', 'Sail home', 'Build a fort'],
    answer: 0,
    feedback: [null, 'That is the opposite.', 'Not the meaning.', 'Not the meaning.'],
    why: 'A British army did this at Saratoga and again at Yorktown.'
  },
  {
    id: 'ss-m2-02-q2',
    lesson: 'ss-m2-02',
    prompt: 'An ally is a country that:',
    choices: ['Fights on your side', 'Fights against you', 'Stays out', 'Sells you food'],
    answer: 0,
    feedback: [null, 'That is an enemy.', 'That is neutral.', 'That is a trader.'],
    why: 'France became one after Saratoga.'
  },
  {
    id: 'ss-m2-02-q3',
    lesson: 'ss-m2-02',
    prompt: 'Saratoga mattered most because it brought in:',
    choices: ['Spain', 'France', 'Russia', 'Canada'],
    answer: 1,
    feedback: ['Not the ally here.', null, 'Russia did not join.', 'Canada did not join.'],
    why: 'A win big enough to change another country’s mind.'
  },
  {
    id: 'ss-m2-02-q4',
    lesson: 'ss-m2-02',
    prompt: 'Saratoga happened in the year:',
    choices: ['1775', '1777', '1781', '1787'],
    answer: 1,
    feedback: ['That was Lexington.', null, 'That was Yorktown.', 'That was the convention.'],
    why: 'Two years after the war began.'
  },
  {
    id: 'ss-m2-02-q5',
    lesson: 'ss-m2-02',
    prompt: 'At Yorktown the British could not escape because:',
    choices: ['Winter came', 'They lost their maps', 'French ships blocked the sea', 'The war was over'],
    answer: 2,
    feedback: ['Weather was not the trap.', 'Maps were fine.', null, 'The war ended after this.'],
    why: 'Trapped on land and at sea at once.'
  },
  {
    id: 'ss-m2-02-q6',
    lesson: 'ss-m2-02',
    prompt: 'A siege means trapping an army until it:',
    choices: ['Sails away', 'Grows larger', 'Gives up', 'Changes sides'],
    answer: 2,
    feedback: ['It cannot sail away.', 'It does not grow.', null, 'That is not a siege.'],
    why: 'That is what happened at Yorktown in 1781.'
  },
  {
    id: 'ss-m2-02-q7',
    lesson: 'ss-m2-02',
    prompt: 'Yorktown happened in the year:',
    choices: ['1775', '1776', '1781', '1787'],
    answer: 2,
    feedback: ['That was Lexington.', 'That was the Declaration.', null, 'That was the convention.'],
    why: 'The last big battle of the war.'
  },
  {
    id: 'ss-m2-02-q8',
    lesson: 'ss-m2-02',
    prompt: 'Washington kept the patriots in the war mainly by:',
    choices: ['Winning every battle', 'Sailing to France', 'Writing the Declaration', 'Never losing his army'],
    answer: 3,
    feedback: ['He lost many battles.', 'Franklin went to France.', 'Jefferson wrote it.', null],
    why: 'He was still there in 1781 because of it.'
  },
  {
    id: 'ss-m2-02-q9',
    lesson: 'ss-m2-02',
    prompt: 'France helped the patriots by sending money, soldiers and:',
    choices: ['Maps', 'Bread', 'Horses', 'Ships'],
    answer: 3,
    feedback: ['Not the main help.', 'Not the main help.', 'Not the main help.', null],
    why: 'The ships are what closed the sea at Yorktown.'
  },
  {
    id: 'ss-m2-02-q10',
    lesson: 'ss-m2-02',
    prompt: 'Supply for an army means its:',
    choices: ['Songs', 'Flags', 'Letters', 'Food and powder'],
    answer: 3,
    feedback: ['Not what it runs on.', 'Not what it runs on.', 'Not what it runs on.', null],
    why: 'Cutting it off is how a siege works.'
  },

  // ---- ss-m2-03 · The ground itself (3/2/3/2) ----
  {
    id: 'ss-m2-03-q1',
    lesson: 'ss-m2-03',
    prompt: 'Terrain means the:',
    choices: ['Shape of a piece of ground', 'Weather in a place', 'Name of a town', 'Size of an army'],
    answer: 0,
    feedback: [null, 'That is weather.', 'That is a name.', 'That is a number.'],
    why: 'It decides who can hide and who can see.'
  },
  {
    id: 'ss-m2-03-q2',
    lesson: 'ss-m2-03',
    prompt: 'Cover means anything you can:',
    choices: ['Hide behind', 'Eat', 'Ride', 'Sell'],
    answer: 0,
    feedback: [null, 'Not the meaning.', 'Not the meaning.', 'Not the meaning.'],
    why: 'Stone walls and trees gave the militia theirs.'
  },
  {
    id: 'ss-m2-03-q3',
    lesson: 'ss-m2-03',
    prompt: 'The road back to Boston gave the British no:',
    choices: ['Cover', 'Water', 'Signposts', 'Bridges'],
    answer: 0,
    feedback: [null, 'Water was not the problem.', 'They knew the way.', 'Bridges were not the issue.'],
    why: 'They were trained to stand in lines in open fields.'
  },
  {
    id: 'ss-m2-03-q4',
    lesson: 'ss-m2-03',
    prompt: 'A ridge is a long strip of land that is:',
    choices: ['Wet', 'High', 'Sandy', 'Frozen'],
    answer: 1,
    feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
    why: 'Holding one lets you see further and shoot down.'
  },
  {
    id: 'ss-m2-03-q5',
    lesson: 'ss-m2-03',
    prompt: 'At Yorktown the sea behind the British became:',
    choices: ['A way out', 'A wall', 'A supply road', 'A hiding place'],
    answer: 1,
    feedback: ['French ships closed it.', null, 'No supplies came.', 'Nowhere to hide.'],
    why: 'Water is only a road if your side holds it.'
  },
  {
    id: 'ss-m2-03-q6',
    lesson: 'ss-m2-03',
    prompt: 'Holding high ground lets an army:',
    choices: ['Move faster', 'Eat better', 'Sleep longer', 'See further'],
    answer: 3,
    feedback: ['Speed is not it.', 'Food is not it.', 'Rest is not it.', null],
    why: 'That is what the fight at Saratoga was about.'
  },
  {
    id: 'ss-m2-03-q7',
    lesson: 'ss-m2-03',
    prompt: 'A harbour is a safe place beside land for:',
    choices: ['Horses', 'Sheep', 'Ships', 'Carts'],
    answer: 2,
    feedback: ['Not for horses.', 'Not for sheep.', null, 'Not for carts.'],
    why: 'Yorktown sat beside one, and that became the trap.'
  },
  {
    id: 'ss-m2-03-q8',
    lesson: 'ss-m2-03',
    prompt: 'The militia fired from behind walls because walls gave them:',
    choices: ['Speed', 'Food', 'Cover', 'Maps'],
    answer: 2,
    feedback: ['Not speed.', 'Not food.', null, 'Not maps.'],
    why: 'Cover is the whole difference on open ground.'
  },
  {
    id: 'ss-m2-03-q9',
    lesson: 'ss-m2-03',
    prompt: 'How many battle sites does Georgia name?',
    choices: ['One', 'Two', 'Three', 'Ten'],
    answer: 2,
    feedback: ['More than one.', 'More than two.', null, 'Far fewer than ten.'],
    why: 'Lexington and Concord, Saratoga and Yorktown.'
  },
  {
    id: 'ss-m2-03-q10',
    lesson: 'ss-m2-03',
    prompt: 'Land can help one side and hurt the other at the:',
    choices: ['Wrong time', 'End only', 'Start only', 'Same time'],
    answer: 3,
    feedback: ['Not about timing.', 'Not only the end.', 'Not only the start.', null],
    why: 'One army has cover exactly when the other has none.'
  },

  // ---- ss-m2-04 · The men in the room (2/3/2/3) ----
  {
    id: 'ss-m2-04-q1',
    lesson: 'ss-m2-04',
    prompt: 'A convention is a meeting held to:',
    choices: ['Decide something big', 'Sell things', 'Watch a game', 'Eat together'],
    answer: 0,
    feedback: [null, 'That is a market.', 'That is a match.', 'That is a meal.'],
    why: 'The one in 1787 built a government.'
  },
  {
    id: 'ss-m2-04-q2',
    lesson: 'ss-m2-04',
    prompt: 'The meeting in Philadelphia was led by:',
    choices: ['George Washington', 'Paul Revere', 'King George III', 'Benedict Arnold'],
    answer: 0,
    feedback: [null, 'He was not there.', 'He ruled Britain.', 'He had changed sides.'],
    why: 'They chose the man they trusted most to keep order.'
  },
  {
    id: 'ss-m2-04-q3',
    lesson: 'ss-m2-04',
    prompt: 'A constitution is the rules that say how a country is:',
    choices: ['Drawn', 'Run', 'Named', 'Sold'],
    answer: 1,
    feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
    why: 'Written down, so it does not depend on one person.'
  },
  {
    id: 'ss-m2-04-q4',
    lesson: 'ss-m2-04',
    prompt: 'The convention met in the year:',
    choices: ['1775', '1787', '1776', '1781'],
    answer: 1,
    feedback: ['That was Lexington.', null, 'That was the Declaration.', 'That was Yorktown.'],
    why: 'Six years after the fighting ended.'
  },
  {
    id: 'ss-m2-04-q5',
    lesson: 'ss-m2-04',
    prompt: 'They kept their debates secret so people could:',
    choices: ['Sleep', 'Leave early', 'Stay cool', 'Change their minds'],
    answer: 3,
    feedback: ['Sleep was not it.', 'They stayed all summer.', 'Windows were shut.', null],
    why: 'Changing your mind in public is hard. They made it easier.'
  },
  {
    id: 'ss-m2-04-q6',
    lesson: 'ss-m2-04',
    prompt: 'A framer is one of the people who:',
    choices: ['Painted pictures', 'Built the rules', 'Sailed the ships', 'Grew the food'],
    answer: 1,
    feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
    why: 'They framed a government, the way you frame a house.'
  },
  {
    id: 'ss-m2-04-q7',
    lesson: 'ss-m2-04',
    // REWORDED, NOT EXEMPTED. "James Madison is remembered for studying
    // governments and:" was eight words carrying three long ones — 38% against a
    // 6% cap. None of "Madison", "remembered" or "governments" is taught by name
    // in this course, so none earns the derived exemption. The name moved into
    // the choices, where it belongs and is not measured.
    prompt: 'Who took notes on almost every day of it?',
    choices: ['Paul Revere', 'King George III', 'James Madison', 'Benedict Arnold'],
    answer: 2,
    feedback: ['He was not there.', 'He ruled Britain.', null, 'He had changed sides.'],
    why: 'His notes are how we know what was said.'
  },
  {
    id: 'ss-m2-04-q8',
    lesson: 'ss-m2-04',
    prompt: 'To debate means to argue about something in order to:',
    choices: ['Win a prize', 'Fill time', 'Decide', 'Make friends'],
    answer: 2,
    feedback: ['No prize.', 'Not to fill time.', null, 'That is not the aim.'],
    why: 'They debated all summer and then signed.'
  },
  {
    id: 'ss-m2-04-q9',
    lesson: 'ss-m2-04',
    prompt: 'The framers had to build a government without a:',
    choices: ['Table', 'Room', 'Pen', 'King'],
    answer: 3,
    feedback: ['They had one.', 'They had one.', 'They had one.', null],
    why: 'Every country they knew of had one. This was new.'
  },
  {
    id: 'ss-m2-04-q10',
    lesson: 'ss-m2-04',
    prompt: 'The oldest man at the convention was:',
    choices: ['Thomas Jefferson', 'James Madison', 'Paul Revere', 'Benjamin Franklin'],
    answer: 3,
    feedback: ['He was in France.', 'He was much younger.', 'He was not there.', null],
    why: 'He was eighty-one that summer.'
  }
];

export default SOCIAL_M2_BANK;
