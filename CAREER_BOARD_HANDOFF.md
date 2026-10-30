# Career board redesign handoff

Project: REPO-kajer-setu-bd (stage-2 idea ID pending)
Input: stage-2 Bangladesh Project Repository Register v1; stage-3 development register v2; existing `main` index/app/model/styles.
Branch: `stage3/career-board-redesign`
Owner direction: replace the shared foundation-card landing page with a distinctive career search, role list and preparation workspace.

## Before / after
Before: a generic introductory hero, search panel and repeating cards, with no role detail pane.
After: a Bangla-first editorial masthead and three-column search / selectable role list / role detail workspace. At 650px and below it stacks in task order. Role details expose example skills and a per-visit preparation checklist. Save/remove and filtering still use the existing `model.js` and `common.js` helpers. No backend or tracking.

## Core journey
1. Search a skill or select a location; optionally filter saved examples.
2. Select one of three **fictional** roles and read its skills, location, unknown deadline/eligibility and missing source.
3. Tick the verification checklist, then open the existing question guide or an independently navigated official directory.
4. Reset filters or save/remove a sample. A zero-result query shows an empty state, never a fabricated vacancy.

No job is live, verified, eligible or open for applications. The external Teletalk directory is a general reference, not proof of any listed example. Nothing is submitted. Saved examples use localStorage and gracefully fall back to in-session state if storage is blocked. Checklist ticks are temporary and clear when changing roles.

## Testing and release
Run `npm test` and `node --check app.js`. Added `career-board.test.js` for connected landmarks, internal link existence, demo warnings, responsive/focus/print rules and reset wiring. Static tests are not a browser accessibility audit.

Before merge, serve `npm start`, inspect 320px, 390px and desktop widths and 200% zoom; keyboard-tab search, role select, save/remove, reset, no matches, role guide, and print; check Bangla font rendering, focus visibility, no horizontal overflow and storage-blocked state. Compare screenshots with KagojSathi, BazarTulona and BonnaSotorko to ensure task-specific composition rather than repeated cards. Budget: index/app/styles combined under 30 KB uncompressed; measure after changes. Check the GitHub build PR #3 and practice planner PR #4 before landing, as `practice.html` is not on main and this branch intentionally does not link it.

No GitHub Pages deployment, real-user validation, live jobs, verified source data or WCAG conformance is claimed. No production merge is authorised for stage 3.
