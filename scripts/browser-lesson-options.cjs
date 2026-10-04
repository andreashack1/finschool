/* eslint-disable @typescript-eslint/no-require-imports -- Browser assertions select semantic option IDs, not content positions. */
const { load } = require('./learning-test-content.cjs');
const { getCorrectAnswerId } = load('src/lib/progress.ts');
async function displayedCorrectIndex(page, screen) {
  const ids = await page.locator('.lesson-answer').evaluateAll(elements => elements.map(element => element.getAttribute('data-option-id')));
  const index = ids.indexOf(getCorrectAnswerId(screen));
  if (index < 0) throw new Error(`Screen "${screen.id}": correct option missing from displayed choices`);
  return index;
}
module.exports = { displayedCorrectIndex };
