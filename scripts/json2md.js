const fs = require('fs');
const path = require('path');
const moment = require('moment');
const current = require('../data/current.json');
const source = require('../data/source.json');
const diff = require('../data/diff.json');

function versionMD() {
  let text = '';
  for (let i = 0; i < source.length; i++) {
    const { type, data } = source[i];
    text += `\n ## ${type}`;
    for (let j = 0; j < data.length; j++) {
      const { name, home, desc, changelog } = data[j];
      if (current[name]) {
        const { version, date } = current[name];
        text += `\n- [${name}](${home})：「[Version：${version}](${changelog})」「Date：${date}」${desc}`;
      }
    }
  }
  fs.writeFileSync(path.resolve(__dirname, `../version.md`), text);
}

function diffMD() {
  const name = moment().format('YYYY-MM-DD');
  let text = `\n## ${name}`
  const keys = Object.keys(diff);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const { version, preVersion, date, preDate } = diff[key];
    text += `\n- ${key}:「${preVersion}(${preDate})」——>「${version}(${date})」`;
  }
  fs.writeFileSync(path.resolve(__dirname, `../diff/${name}.md`), text);
}

module.exports = function main() {
  versionMD();
  diffMD();
}

