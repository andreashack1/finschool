# Fini V2 — production sources

Identity source: `design-references/fini-v2-reference.png` (user supplied). No redraws or SVG approximations.

## Approved expression sources

All filenames below are inside `design-references/`, supplied by the user with an existing alpha channel:

| Source filename suffix | Production export under `public/brand/fini-v2/` | Use |
| --- | --- | --- |
| `03_36_32 PM-2.png` | `home.webp` | Calm hands together: normal bust, Home, onboarding, About |
| `03_36_33 PM-3.png` | `thinking.webp` | Hand on chin: facts, explanatory hints, SimLife, monthly review |
| `03_36_30 PM-1.png` | `excited.webp`, `excited-head.webp` | Raised hand/open-mouth smile: completion, milestones, level-up |
| `03_36_35 PM-4.png` | `profile.webp` | Stable direct-view portrait: Profile, small avatars, normal/serious/wrong head |
| `03_36_37 PM-5.png` | `correct.webp` | Closed-eye happy portrait: correct feedback, achievement toast |

`neutral-full.webp` comes from `design-references/fini-v2-full-transparent.png`: canonical full-body reference with background removed using the built-in image tool. The original reference is retained unchanged. Full-body neutral, wrong and serious share this source.

Run `node scripts/create-fini-v2.cjs` to reproduce lossless WebP exports, preserving alpha. No white/card backgrounds or screenshots are exported. Source exports are capped at 900px; Next/Image supplies responsive optimized delivery.

Central mapping: `app/components/finly-brand.tsx`. Wrong and serious intentionally share normal, encouraging artwork. Thinking and correct have one portrait source across framings; excited shares its upper-body source for bust/full and has an upper portrait crop for head. Only neutral currently has true full-body art; other full framings use the entire available pose without inventing anatomy. Missing variants fall back to the neutral V2 framing, never V1.

## Historical/source-only

- `design-references/archive/fini-v1/`: 19 retired V1 SVGs and their old generator, not served by the app.
- `design-references/archive/fini-v2-phase1/`: retired opaque single-pose WebPs, not served by the app.
- `design-references/CUsersFabianbani-appdesign-referencesfini-v2-reference`: duplicate original source with a malformed filename; not used by production.
- Historical screenshots under `artifacts/`: QA evidence only, never production art.
