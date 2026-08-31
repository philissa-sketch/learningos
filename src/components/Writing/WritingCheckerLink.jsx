/**
 * "Check it yourself before you turn it in."
 *
 * Placed in the STUDENT's view on purpose, and never on the parent's.
 * That was a deliberate decision (Aug 2026): a checker gives sentence-level
 * feedback, which is only worth something to the person who then fixes
 * it. If the parent ran it, he would never see the loop between his own
 * mistake and the correction, and proofreading would become her job
 * permanently instead of a habit he owns.
 *
 * It also protects her time in a concrete way. The written rubric has
 * four criteria; three of them — understanding, evidence, organization —
 * genuinely need a human reader. Mechanics does not. If he has already
 * run the draft through a checker, that line grades itself and she is
 * only judging the parts that actually need her.
 *
 * ---- WHICH TOOL, AND A CORRECTION (Aug 10, 2026) ----
 *
 * This linked quill.org, on a note in this file claiming "the parent created a
 * Quill account." She corrected it: the account she has is QUILLBOT, which is
 * a different company and a different product. Quill.org is a nonprofit
 * grammar-practice site for grades 3-12; QuillBot is an AI writing suite. The
 * similar name is the whole trap, and this file walked into it.
 *
 * THE LINK GOES TO THE GRAMMAR CHECKER, NOT THE HOMEPAGE, and that is
 * deliberate. quillbot.com opens on the PARAPHRASER — a tool whose entire
 * function is rewriting his sentences into different words. Every research
 * paper checklist in this app contains the line "wrote it in my own words —
 * nothing copied and pasted," and a paraphraser is precisely the machine that
 * makes that line meaningless. /grammar-check opens on the checker instead:
 * free, no account, flags spelling, grammar and punctuation and leaves the
 * writing his.
 *
 * Both URLs were opened and confirmed on Aug 10, 2026 before being added,
 * which is the standing rule for every external link in this project.
 *
 * The citation generator is linked separately and only on research papers,
 * because those are the only assignments that ask for a source list — and
 * formatting a citation by hand teaches nothing that matters at twelve.
 */

export const WRITING_CHECKER = {
  name: 'QuillBot\u2019s grammar checker',
  url: 'https://quillbot.com/grammar-check',
  what: 'Checks your sentences and tells you what to fix — spelling, grammar, punctuation.'
};

/**
 * Shown only on research papers. Free, no account, does MLA/APA/Chicago.
 */
export const CITATION_HELPER = {
  name: 'QuillBot\u2019s citation generator',
  url: 'https://quillbot.com/citation-generator',
  what: 'Builds your source list in the right format — paste a link or a book title.'
};

/**
 * `citations` — only true for a Research Paper. The source list is the one
 * requirement those carry that no other assignment does.
 */
export function WritingCheckerLink({ compact = false, citations = false }) {
  if (compact) {
    return (
      <p className="text-xs text-ink-500">
        Before you turn it in, run it through{' '}
        <a
          href={WRITING_CHECKER.url}
          target="_blank"
          rel="noreferrer"
          className="text-signal-cyan underline hover:brightness-110"
        >
          {WRITING_CHECKER.name}
        </a>{' '}
        and fix what it flags. You are allowed to disagree with it.
        {citations && (
          <>
            {' '}Build your source list with{' '}
            <a
              href={CITATION_HELPER.url}
              target="_blank"
              rel="noreferrer"
              className="text-signal-cyan underline hover:brightness-110"
            >
              {CITATION_HELPER.name}
            </a>.
          </>
        )}
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Check your own work</p>
      <p className="mt-1 text-xs text-ink-300">
        Run your draft through{' '}
        <a
          href={WRITING_CHECKER.url}
          target="_blank"
          rel="noreferrer"
          className="text-signal-cyan underline hover:brightness-110"
        >
          {WRITING_CHECKER.name}
        </a>{' '}
        before you turn it in. {WRITING_CHECKER.what}
      </p>
      {/* The "decide, don't just accept" instruction matters as much as
          the link. A checker that gets accepted blindly trains a student
          to stop thinking about his own sentences — and checkers are
          genuinely wrong about voice and rhythm. */}
      <p className="mt-1 text-xs text-ink-600">
        Read each suggestion and decide. It is wrong sometimes, especially about how a sentence sounds — you are
        allowed to keep yours.
      </p>
      {/* Said plainly to HIM, because the tool is one tab away from doing it
          for him and no rule he cannot see will stop that. The rest of this
          app asks him to write in his own words; this is where that is
          worth naming out loud. */}
      <p className="mt-1 text-xs text-ink-600">
        Use it to fix your own sentences, not to have it rewrite them. The words should still be yours.
      </p>
      {citations && (
        <p className="mt-2 border-t border-space-700 pt-2 text-xs text-ink-300">
          For the source list:{' '}
          <a
            href={CITATION_HELPER.url}
            target="_blank"
            rel="noreferrer"
            className="text-signal-cyan underline hover:brightness-110"
          >
            {CITATION_HELPER.name}
          </a>{' '}
          — {CITATION_HELPER.what}
        </p>
      )}
    </div>
  );
}
