/* eslint-disable @typescript-eslint/no-require-imports -- Compatibility entry point for the complete v2 unit suite. */
const { spawnSync } = require('node:child_process');
const result = spawnSync(process.execPath, [require('node:path').join(require('node:path').dirname(require.resolve('vitest/package.json')), 'vitest.mjs'), 'run'], { stdio: 'inherit' });
process.exitCode = result.status ?? 1;

