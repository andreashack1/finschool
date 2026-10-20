# Home Fini scale adjustment

Production change: only Home-specific CSS at the end of `app/finly-app.css`. Asset bytes, mascot component, Home markup/copy/CTA, Profile, and other mascot sizing are unchanged. Home collision assertions in `tests/fini-v2-browser.mjs` now measure the painted alpha footprint rather than transparent image padding.

## Footprint comparison

The lion fills 67.1% of the V2 canvas width. Measurements below use alpha > 128 (not canvas dimensions).

| Context | Old V1 baseline | V2 before this fix | V2 after |
| --- | --- | --- | --- |
| Mobile 350–390 | approximately 132 × 182px at the old 148px reference sizing | 67 × 92px | 141 × 192px |
| Desktop | approximately 170 × 234px at the old 190px sizing | 91 × 124px | 168 × 228px |

Final image canvas: 210 × 210px at <=430px, 220 × 220px on intermediate widths, 250 × 250px at >=900px. Right offset -16px compensates for transparent padding; visible face/mane/hands remain fully inside the card. Object fit stays contain; object position is centered. Text reserves local horizontal space and long heading words can wrap; the existing card DOM/copy/CTA are preserved.

## Validation

350, 360, 375, 390, 430 and 1280px: passed painted-footprint/card bounds, text clearance (at least 10px), control clearance, unchanged V2 src, overflow and runtime-error checks. Also checked a long lesson title at each width. Before/after and Profile captures are under `browser/`; `browser/report.json` contains exact measurements. Manually reviewed the requested Home widths, with no face/hand crop or CTA collision.

Passed: lint, TypeScript, 21 relevant mascot tests, production build, and `git diff --check`. The mascot component and Home markup were byte-compared against the pre-task snapshots and are unchanged. Existing unrelated changes were preserved. No commit, push or deploy.
