# Stage 4: fictional-role verification guide

**Queue ID:** `REPO-kajer-setu-bd`. **Base:** foundation/basic-website at `3ae08b85b7c79f8521f20228d0a6a4bb9aa98ed8` (PR #1). **Branch:** `stage4/job-circular-verification-guide`. This is a stacked review branch, not a deployed website.

## User task

Choose a fictional role, ask a Bangla or English question, learn what to check in a real employer circular, and navigate to a general official recruitment or skills route. The original sample search and saved-role interface remains usable without this guide. No role has a real employer source, publication date, verified requirements, salary, application URL or deadline; the guide never marks a role as currently open or a user as eligible.

## Setup and checks

Run `npm test` with Node 20+ and serve the static folder using `python3 -m http.server 8000`. Open `/role-guide.html`. No install, lockfile, backend, model or environment secrets are required. `node --check role-guide.js` checks syntax. Test keyboard selection, prompt buttons, form submission, focus return, clear action, 320px layout, Bangla fonts, reduced motion, no-JavaScript links and mobile loading in a real browser before landing. Tests cover date/source validation, stale and expired status, unsupported and prompt-injection questions, private identifiers, language and official link allowlists.

## Evidence, limits and privacy

- [Teletalk government recruitment directory](https://alljobs.teletalk.com.bd/) is linked from a government agency recruitment page, checked 2026-10-30; it is not evidence of a vacancy in this app.
- [NSDA National Skills Portal](https://www.skillsportal.gov.bd/) describes training-provider and skills services, checked 2026-10-30; it does not verify the sample skill descriptions.
- [MDN ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) informs the status pattern. Automated tests do not certify screen-reader or WCAG 2.2 AA compliance.

Questions are processed locally, not echoed, logged, stored, transmitted or sent to a provider. No paid API, server, analytics, alerts, external applications or data automation. This is an offline deterministic FAQ, **not AI**. No provider is connected, so model activation requires separate budget/credentials, editorial evidence with per-job sources and dates, server-enforced rate/token/spend controls, consent/privacy review and safety tests. The guide is deliberately usable without model activation.

## Stage 5

Review foundation PR #1, then this stacked PR. Serve the site over HTTP and verify actual module loading and 320/390px mobile, keyboard, 200% zoom, screen-reader announcements and no-JS fallback. Editorially review official routes and avoid implying sample roles are real. No production merge or deployment is authorised by this stage.
