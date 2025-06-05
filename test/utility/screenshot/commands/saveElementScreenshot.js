const _ = require('lodash');
const makeElementScreenshot = require('../modules/makeElementScreenshot.js');
const saveBase64Image = require('../utils/saveBase64Image.js');

/**
 * @alias browser.saveElementScreenshot
 * @param {string=} fileName
 * @param {string} elementSelector
 * @param {Object=} options
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
module.exports = async function async(fileName, elementSelector, options) {

  if ((_.isString(fileName) || _.isArray(fileName)) && _.isPlainObject(elementSelector) && _.isUndefined(options)) {
    options = elementSelector;
    elementSelector = fileName;
    fileName = undefined;
  } else if ((_.isString(fileName) || _.isArray(fileName)) && _.isUndefined(elementSelector)) {
    elementSelector = fileName;
    fileName = undefined;
  }

  if (!(_.isString(elementSelector) || _.isArray(elementSelector))) {
    throw new Error('Please pass a valid selector value to parameter elementSelector');
  }

  // make screenshot of area
  const base64Image = await makeElementScreenshot(this, elementSelector, options);

  if (typeof fileName !== 'undefined') {
    // store base64 image as real png
    await saveBase64Image(fileName, base64Image);
  }

  return base64Image;
}
