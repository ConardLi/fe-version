
const puppeteer = require('puppeteer');


const setup = async (headless = false) => {

  const browser = await puppeteer.launch({
    args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--start-maximized'],
    defaultViewport: null
  });

  return browser;

};

module.exports = setup;