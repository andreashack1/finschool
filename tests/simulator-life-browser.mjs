// Extends the existing browser/API/PostgreSQL regression without remote data.
process.argv.push('--life');
await import('./simulator-subscriptions-browser.mjs');
