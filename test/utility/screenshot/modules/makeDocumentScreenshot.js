const debug = require('debug');
const makeAreaScreenshot = require('./makeAreaScreenshot.js');
const beforeScreenshot = require('./beforeScreenshot.js');
const afterScreenshot = require('./afterScreenshot.js');
const getScreenDimensions = require('../scripts/getScreenDimensions.js');
const ScreenDimension = require('../utils/ScreenDimension.js');

const log = debug('wdio-screenshot:makeDocumentScreenshot');


module.exports = async function makeDocumentScreenshot(browser, options = {}) {
  log('start document screenshot');

  // hide scrollbars, scroll to start, hide & remove elements, wait for render
  await beforeScreenshot(browser, options);

  // get screen dimisions to determine document height & width
  const screenDimensions = await browser.execute(getScreenDimensions);
  const screenDimension = new ScreenDimension(screenDimensions, browser);

  // make screenshot of area
  const base64Image = await makeAreaScreenshot(browser, 0, 0, screenDimension.getDocumentWidth(), screenDimension.getDocumentHeight());

  // show scrollbars, show & add elements
  await afterScreenshot(browser, options);

  log('end document screenshot');

  return base64Image;
}
