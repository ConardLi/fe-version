const setup = require('../utils/setup');

const URL = 'https://support.google.com/chrome/a/answer/7679408?hl=en';

module.exports = async function main() {
  const browser = await setup();
  const page = await browser.newPage();
  await page.goto(URL);
  let text = await page.$eval('td', el => el.innerText);
  text = text.replace('Chrome ', '');
  console.log(text);
  await browser.close();
  return {
    version: text.split(': ')[0],
    date: text.split(': ')[1]
  }
}
