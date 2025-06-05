const debug = require('debug');
const makeAreaScreenshot = require('./makeAreaScreenshot.jsshot');
const beforeScreenshot = require('./beforeScreenshot.js');
const afterScreenshot = require('./afterScreenshot.js');
const scroll = require('../scripts/scroll.js');
const getScrollPosition = require('../scripts/getScrollPosition.js');
const getScreenDimensions = require('../scripts/getScreenDimensions.js');
const ScreenDimension = require('../utils/ScreenDimension.js');

const log = debug('wdio-screenshot:makeViewportScreenshot');


// Note: function name must be async to signalize WebdriverIO that this function returns a promise
module.exports = async function makeViewportScreenshot(browser, options = {}) {
  log('start viewport screenshot');

  // get current scroll position
  const [startX, startY] = await browser.execute(getScrollPosition);

  // hide scrollbars, scroll to start, hide & remove elements, wait for render
  await beforeScreenshot(browser, options);

  // get screen dimisions to determine viewport height & width
  const screenDimensions = await browser.execute(getScreenDimensions);
  const screenDimension = new ScreenDimension(screenDimensions, browser);

  // make screenshot of area
  const base64Image = await makeAreaScreenshot(browser, startX, startY, screenDimension.getViewportWidth(), screenDimension.getViewportHeight());

  // show scrollbars, show & add elements
  await afterScreenshot(browser, options);

  // scroll back to original position
  await browser.execute(scroll, startX, startY);

  log('end viewport screenshot');

  return base64Image;
}
