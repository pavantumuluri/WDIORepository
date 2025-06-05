const debug = require('debug');
const makeAreaScreenshot = require('./makeAreaScreenshot.js');
const beforeScreenshot = require('./beforeScreenshot.js');
const afterScreenshot = require('./afterScreenshot.js');
const groupBoundingRect = require('../utils/groupBoundingRect.js');
const getBoundingRects = require('../scripts/getBoundingRects.js');

const log = debug('wdio-screenshot:makeElementScreenshot');


module.exports = async function makeElementScreenshot(browser, elementSelector, options = {}) {
  log('start element screenshot');

  // hide scrollbars, scroll to start, hide & remove elements, wait for render
  await beforeScreenshot(browser, options);

  // get bounding rect of elements
  const boundingRects = await browser.selectorExecute(elementSelector, getBoundingRects);
  const boundingRect = groupBoundingRect(boundingRects);

  // make screenshot of area
  const base64Image = await makeAreaScreenshot(browser, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom);

  // show scrollbars, show & add elements
  await afterScreenshot(browser, options);

  log('end element screenshot');

  return base64Image;
}
