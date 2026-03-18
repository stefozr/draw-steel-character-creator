// Test harness — loads DS namespace + data files into Node.js
const fs = require('fs');
const path = require('path');

// Minimal browser globals so IIFEs work
globalThis.window = globalThis;
globalThis.DS = { Data: {}, Steps: {}, Components: {} };
globalThis.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ style: {}, classList: { add() {}, remove() {} }, appendChild() {}, addEventListener() {} })
};
globalThis.Image = function() {};
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
globalThis.setTimeout = setTimeout;
globalThis.clearTimeout = clearTimeout;

const ROOT = path.resolve(__dirname, '..');

// Load files in dependency order (data first, then core modules)
const loadOrder = [
  'data/ancestries.js',
  'data/cultures.js',
  'data/careers.js',
  'data/kits.js',
  'data/beast-kits.js',
  'data/perks.js',
  'data/complications.js',
  'data/skills.js',
  'data/languages.js',
  'data/classes/fury.js',
  'data/classes/conduit.js',
  'data/classes/shadow.js',
  'data/classes/censor.js',
  'data/classes/elementalist.js',
  'data/classes/null.js',
  'data/classes/tactician.js',
  'data/classes/talent.js',
  'data/classes/troubadour.js',
  'js/state.js',
  'js/calculator.js'
];

loadOrder.forEach(f => {
  const fullPath = path.join(ROOT, f);
  const code = fs.readFileSync(fullPath, 'utf-8');
  try {
    eval(code);
  } catch (e) {
    console.error(`Failed to load ${f}:`, e.message);
    throw e;
  }
});

module.exports = { DS: globalThis.DS, ROOT };
