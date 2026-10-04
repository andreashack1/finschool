/* eslint-disable @typescript-eslint/no-require-imports -- Test-only TypeScript loader. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
  const absolute = path.resolve(file);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const compiled = { exports: {} };
  cache.set(absolute, compiled);
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const localRequire = id => {
    if (!id.startsWith('.')) return require(id);
    const resolved = path.resolve(path.dirname(absolute), id);
    return load(fs.existsSync(resolved + '.ts') ? resolved + '.ts' : path.join(resolved, 'index.ts'));
  };
  new Function('require', 'module', 'exports', code)(localRequire, compiled, compiled.exports);
  return compiled.exports;
}
module.exports = { load };
