# Finly product polish

- `/`: mobile-first product home with four bottom navigation destinations; desktop home uses two columns within 800px, other interactive screens use a 540–560px shell.
- `/despre`: preserved original landing page, interactive preview and privacy/terms dialogs.
- `/lectie`: original 25-question, seven-interaction salary lesson, now with shared visual styling, Fini feedback and saved progress.
- `/rapid?lesson=inflatie|carduri|buget`: three short learning flows.

Primary sky blue `#69B9FF`, background `#F5FAFF`, navy `#0B1B33`, light blue `#EAF6FF`, borders `#DFEBF6`. Muted text is slightly darker than the suggested palette (`#5D6D82`) to meet text contrast requirements. Bricolage Grotesque is used throughout the product.

Progress persists locally with Zustand: XP, streak, completed lessons, salary position and simulator decisions. Rewards are credited once per lesson/simulation and once per date for the challenge. Profile begins with the requested example numbers (720 XP, 7-day streak, 18 lessons, 14-day record); this is disclosed in the profile. No account backend is added.

Fini: 18 native SVG assets in `public/brand`, six expressions across head, bust and full-body crops. Regenerate with `node scripts/create-fini-variants.cjs`. Asset provenance is in `public/brand/SOURCES.md`.

Verification: `npm run lint`, `npm run build`, `scripts/verify-product.cjs`. Browser verification covers 320, 375, 390, 430, 768 and 1440px, all navigation destinations, horizontal overflow, image loading, challenge retry and reward persistence, salary resumption and all 25 questions, mini lessons, simulator balance and achievements. Axe checks the main screens and lesson feedback at 390 and 1440px. Screenshots and machine-readable results are in this directory.

Browser scripts accept `FINLY_BASE_URL`, `FINLY_PLAYWRIGHT_PATH` and `FINLY_AXE_PATH` when those packages are supplied by the local tool cache.
