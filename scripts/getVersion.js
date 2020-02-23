const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const moment = require('moment');
const source = require('../data/source.json');
const current = require('../data/current.json');
const chrome = require('./special/chrome');

function getNpmInfo(package) {
  const data = execSync(`npm info ${package} --json`, { encoding: 'utf8' });
  const { version, publish_time } = JSON.parse(data);
  const date = moment(publish_time).format("YYYY-MM-DD");
  console.log(package, version, date);
  return { version, date }
}

module.exports = async function main() {
  fs.writeFileSync(path.resolve(__dirname, `../data/pre.json`), JSON.stringify(current));
  const result = {};
  for (let i = 0; i < source.length; i++) {
    const { data } = source[i];
    for (let j = 0; j < data.length; j++) {
      const { name, type, npm } = data[j];
      if (type === 'npm') {
        result[name] = getNpmInfo(npm);
      } else if (name === 'Chrome') {
        result[name] = await chrome();
      } else {
        result[name] = { version: 0, date: '' }
      }
    }
  }
  fs.writeFileSync(path.resolve(__dirname, `../data/current.json`), JSON.stringify(result));
}
