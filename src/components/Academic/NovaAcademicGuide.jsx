import { NovaMessage } from '../Mentor/NovaMessage.jsx';

// ---------------------------------------------------------------------------
// NOVA IN THE ACADEMIC SUCCESS CENTER.
// (Built Aug 9, 2026.)
//
// Four tabs, and they are not all his. Books and Assignments are things he
// acts on; Portfolio is a record that fills itself; Parent Setup belongs to his
// mother and has no login in front of it yet.
//
// THAT LAST ONE DECIDES THE TONE. A guide that spoke to him on all four tabs
// would either invite him to change things that are not his, or waffle. Nova
// says plainly whose screen it is and what he can actually do there — which is
// also the honest thing to do while Parent Setup is reachable without a gate.
//
// WHAT THE COPY WILL NOT DO:
//   - It will not promise the deferred Part 9 features. There is no AI reading
//     planner, no workload balancer, no curriculum coach. This app has no live
//     AI, and Nova implying otherwise would be a promise the app cannot keep.
//   - It will not tell him he can add books. He cannot; titles, authors and
//     which slots exist are his parent's, and he changes reading status only.
//     Telling a student to do something the screen will not let him do is how
//     he learns to stop reading the instructions.
// ---------------------------------------------------------------------------

const GUIDES = {
  books: {
    body: (
      <>
        Every subject has slots, and an empty one is not a mistake — it is a book that has not been
        chosen yet. <strong>The one thing here that is yours is the status</strong>: not started,
        reading, finished. Keep it honest and the rest of the app stays honest with you, because
        finished books feed your Progress screen and your ship&rsquo;s sensors. Titles and slots are
        your mom&rsquo;s to fill in.
      </>
    ),
    speak:
      'Every subject has slots, and an empty one is not a mistake. It is a book that has not been chosen yet. The one thing here that is yours is the status. Not started, reading, finished. Keep it honest and the rest of the app stays honest with you, because finished books feed your Progress screen and your ship’s sensors. Titles and slots are your mom’s to fill in.'
  },

  assignments: {
    body: (
      <>
        The real assignments for this quarter, with their due dates. Move each one along as you go —
        not started, in progress, completed. <strong>Big ones break into steps</strong>, and ticking
        those off is the whole trick: nobody writes a research paper, they write an outline, then a
        draft, then a better draft. If there is a reflection box at the end, it is for you, not for a
        grade — what you would do differently is the part you will actually remember next time.
      </>
    ),
    speak:
      'The real assignments for this quarter, with their due dates. Move each one along as you go. Not started, in progress, completed. Big ones break into steps, and ticking those off is the whole trick. Nobody writes a research paper. They write an outline, then a draft, then a better draft. And if there is a reflection box at the end, it is for you, not for a grade. What you would do differently is the part you will actually remember next time.'
  },

  portfolio: {
    body: (
      <>
        This one fills itself. Finished journal entries, completed assignments and projects your mom
        logs all land here automatically, newest first — <strong>you do not have to remember to add
        anything</strong>. It is worth knowing what this is for: it is the record that outlasts the
        school year. When somebody asks what you have actually built and written, this is the answer,
        and it is a great deal more convincing than a grade.
      </>
    ),
    speak:
      'This one fills itself. Finished journal entries, completed assignments, and projects your mom logs all land here automatically, newest first. You do not have to remember to add anything. It is worth knowing what this is for. It is the record that outlasts the school year. When somebody asks what you have actually built and written, this is the answer, and it is a great deal more convincing than a grade.'
  },

  setup: {
    body: (
      <>
        <strong>This tab is your mom&rsquo;s.</strong> It is where the real books and assignments get
        filled in, and there is nothing here for you to change. Worth a look anyway if you are curious
        about what is coming — knowing what is on the list is not cheating, it is planning.
      </>
    ),
    speak:
      'This tab is your mom’s. It is where the real books and assignments get filled in, and there is nothing here for you to change. Worth a look anyway if you are curious about what is coming. Knowing what is on the list is not cheating, it is planning.'
  }
};

/** Nova's explanation for one Academic Success Center tab. */
export function NovaAcademicGuide({ tab }) {
  const guide = GUIDES[tab];
  if (!guide) return null;
  return (
    <div className="mb-4">
      <NovaMessage tone="brief" speak={guide.speak}>
        {guide.body}
      </NovaMessage>
    </div>
  );
}

export const NOVA_ACADEMIC_TAB_IDS = Object.keys(GUIDES);
