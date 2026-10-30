# Skill practice planner — stage 4 handoff

Stable project ID: REPO-kajer-setu-bd. Input: stage-3 register v2 (2026-10-30 16:14 UTC), stage-2 register v1, stage-1 idea bank v2. Exact base: 9b602afe5c7956b59e8361572a48ecacc89aef76 (main). Branch: stage4/private-skill-practice-planner. This work does not change stage-3 source/expiry validation code or stage-5 checked-build branch.

## What visitors can do

Choose one of three fictional roles, mark skills they have already practised, choose 15/30/60 minutes, and generate a local, printable, bilingual practice plan. It includes a first step to verify a real employer circular and a final reflection step. This is a practice aid, not an eligibility assessment, course endorsement, vacancy feed or AI chat. No form submission, tracking, cookies, API keys, saved history or model calls. The main role search and question guide remain available without this page.

## Data and sources

Role labels and example skills come from the existing fictional model.js; exercise prompts are original editorial examples, not official job requirements. The general navigation links are https://alljobs.teletalk.com.bd/ and https://skillsportal.gov.bd/ . The National Skills Portal's purpose was rechecked 2026-10-30, but no specific course, opening or eligibility was verified. MDN documentation for polite live announcements: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions ; printing: https://developer.mozilla.org/en-US/docs/Web/API/Window/print . No external libraries or paid services; native ES modules, no lockfile needed.

## Verify before release

Run npm test, node --check practice.js and node --check practice-model.js. Serve with npm start and check the actual page at 320px, 390px, 1280px, 200% zoom, keyboard-only navigation, focus after generation, Bangla font rendering, print layout, JS disabled, reduced motion and screen-reader announcements. Check original role search and guide still work. No real-user test, accessibility certification, field Core Web Vitals or production deployment is implied by Node CI. Stage 5 should review the distinct feature PR and the checked-build PR #3; do not merge or deploy without separate release authority.

## Privacy and activation

No backend and no AI provider. Nothing is transmitted; choices disappear on refresh. A future model would require editorially reviewed sources, provider/budget approval, a server-side key, request/token/spend limits, privacy disclosures and independent abuse testing. Do not describe the existing FAQ or this planner as live AI.
