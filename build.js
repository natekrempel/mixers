const fs = require('fs-extra');
const babel = require('babel-core');

function compile (path, out) {
  const js = fs.readFileSync(path).toString();
  return fs.writeFileSync(out, babel.transform(`${js}`, {presets: ['es2015']}).code);
}

compile('./lib/commands.js', './index.js');
