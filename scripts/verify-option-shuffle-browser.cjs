// Compatibility entry point: account/browser QA now uses cloud APIs, never legacy local progress.
import("./verify-account-local.mjs").catch(error => { console.error(error.message); process.exitCode = 1; });
