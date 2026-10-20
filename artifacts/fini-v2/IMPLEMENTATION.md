# Fini V2 implementation audit

## Current V1 uses found

No active V1 use remained at the expression-update audit: the prior phase had already centralized V2, but all six moods used the same opaque canonical artwork. The 19 V1 SVGs and generator remain explicitly historical under `design-references/archive/fini-v1/`. The three phase-1 opaque WebPs have now also been archived outside `public`.

## Source inventory and exact mapping

Canonical identity: `design-references/fini-v2-reference.png` (unchanged). All five new user-supplied PNGs have alpha:

| Source (all begin `ChatGPT Image Oct 17, 2026, `) | UI | Production export |
| --- | --- | --- |
| `03_36_32 PM-2.png` | Calm Home primary, normal bust, onboarding/About | `home.webp` |
| `03_36_33 PM-3.png` | Thinking/facts, lesson guides, SimLife, monthly reviews | `thinking.webp` |
| `03_36_30 PM-1.png` | Excited lesson completion, milestones, level-up | `excited.webp`, `excited-head.webp` |
| `03_36_35 PM-4.png` | Stable Profile/Home avatar; normal, wrong and serious head | `profile.webp` |
| `03_36_37 PM-5.png` | Correct feedback and achievement toast | `correct.webp` |

`neutral-full.webp` comes from `design-references/fini-v2-full-transparent.png`, created by background removal from the canonical full-body reference using the imagegen skill. No new pose was invented. All seven production files live under `public/brand/fini-v2/` and retain transparent alpha.

## Component API and sharing

`FinlyMascot` retains head/bust/full and normal/thinking/correct/wrong/excited/serious. The centralized asset map includes real dimensions and accurate alt text. Wrong and serious share normal, warm art. Missing variants fall back to the normal V2 framing. Thinking and correct share their respective portrait sources across framings; excited bust/full share its complete upper-body source, while head uses an upper crop retaining the raised hand. Only neutral currently has true full-body art. Additional full-body expression art can be added centrally later.

Home always selects normal, including the all-lessons-completed Home state. The lesson completion component still selects excited for both normal and legacy quick lesson flows. Profile is stable across renders. No customization was added.

## Files changed for the mascot work

- `app/components/finly-brand.tsx`: centralized expression/framing map, dimensions, alt copy, transparent rendering.
- `app/finly-client.tsx`: calm Home primary selection.
- `app/finly-app.css`: local mascot dimensions and reserved text/control space only.
- `scripts/create-fini-v2.cjs`: reproducible alpha-preserving lossless exports.
- `scripts/verify-about.mjs`: production V2 path assertion.
- `tests/fini-v2.test.ts`: 18 combinations, alpha/dimension checks, server rendering, fallback/semantic mapping and stale-path guard.
- `tests/fini-v2-browser.mjs`: isolated-only test gallery and real app route/viewport checks.
- `public/brand/SOURCES.md`, `design-references/FINI-V2.md`, `src/lib/simulator/CHAPTER_7.md`: provenance, character bible and current usage documentation.
- Seven production WebPs, full-body transparent source, and historical asset archives.

Unrelated pre-existing working-tree changes were preserved. No commit, push or deployment.

## Repository search classification

- Active V2: every `FinlyMascot` use in Home/Profile, About, account/onboarding, lesson reading/player/completion, gamification moments, SimLife and monthly reviews. All resolve centrally; no direct active V1 paths.
- V2 tools/tests/docs: export script, About browser assertion, new unit/browser tests, source/bible documentation and updated simulator chapter notes.
- Historical: `design-references/archive/**`, `artifacts/about-qa/REBUILD-REPORT.md` (old SVG path in an old report), `artifacts/savings-goal/final-correction.diff.txt` (old component snapshot), historical screenshots.
- Unused/source-only: malformed duplicate canonical reference filename and retired opaque phase-1 exports. Neither is publicly served.

## Responsive evidence

`browser/report.json`: 48 route/viewport checks at 350, 360, 375, 390, 430 and 1280px. Home, Profile, About, SimLife, welcome, lesson guide, actual trial completion and all 18 mood/framing combinations passed image decoding, viewport overflow, transparent styling, and runtime/image-error checks. Home also asserts text/mascot/control separation and exact calm/thinking sources. Fact cards have separate scrolled captures. All production assets passed the Next image optimizer (384px responses approximately 13–17 KB).

Manual review: all six Home widths; mobile Profile, fact, lesson guide and completion contact sheets; desktop completion. No white rectangles, distorted images, damaged face crops or covered CTAs were observed. Mobile contact sheets and individual screenshots are stored alongside this report.

## Remaining art limitations

Full-body versions of the new thinking/correct/excited expressions were not supplied. Full API calls for these expressions use complete supplied upper-body artwork rather than invented legs. No current app call site requests full framing. Optional future full-body expressions can replace these centrally.

## Validation

- `npm run lint`: passed without warnings.
- `npx tsc --noEmit`: passed (no `typecheck` script exists).
- `npm run build`: passed; all 53 pages generated.
- `tests/fini-v2.test.ts`: 21 tests passed, including all 18 framing/mood combinations with real alpha/dimensions and server-rendered Next/Image markup.
- Browser: 48 route/viewport checks passed, plus six fact-card captures; no runtime, hydration, image-response or provider errors.
- Answer-option, extended-lesson and learning validation scripts: passed.
- `git diff --check`: passed. Final working-tree status and diff reviewed; unrelated edits preserved.
- Default `npm test` exposed a simulator test timeout: `tests/simulator-daily-floor.test.ts`, “uses only curated at-home decisions when ordinary evening slots have passed”. Its 24 planning cases took 6–9 seconds against the default 5-second test timeout. All other 943 tests passed. No simulator code/test/config was changed for this mascot task; validation is also run with a command-line 15-second timeout.
- `npx vitest run --testTimeout 15000`: all 56 files and 944 tests passed. The timeout was supplied only on the command line; repository timeout settings remain unchanged.
