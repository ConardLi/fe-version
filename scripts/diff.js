const fs = require('fs');
const path = require('path');
const current = require('../data/current.json');
const pre = require('../data/pre.json');


module.exports = function main() {
  const result = {};
  const keys = Object.keys(current);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (current[key]) {
      const { version, date } = current[key];
      const { version: preVersion, date: preDate } = pre[key];
      if (version !== preVersion) {
        result[key] = { version, date, preVersion, preDate };
      }
    }
  }
  fs.writeFileSync(path.resolve(__dirname, `../data/diff.json`), JSON.stringify(result));
}

