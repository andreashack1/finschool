import { spawn } from 'node:child_process';
const tests=spawn(process.execPath,['node_modules/vitest/vitest.mjs','run','tests/simulator-life.test.ts','tests/simulator-life-state.test.ts','tests/simulator-life-integration.test.ts','tests/simulator-life-api.test.ts'],{stdio:'inherit',windowsHide:true});
tests.on('exit',code=>{process.exitCode=code??1;});
