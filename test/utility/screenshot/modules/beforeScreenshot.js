const debug = require('debug');

const scroll = require('../scripts/scroll.js');
const scrollbars = require('../scripts/scrollbars.js');
const modifyElements = require('../scripts/modifyElements.js');
const triggerResize = require('../scripts/triggerResize.js');

const log = debug('wdio-screenshot:beforeScreenshot');

module.exports = async function beforeScreenshot(browser, options) {
  // hide scrollbars
  log('hide scrollbars');
  await browser.execute(scrollbars, false);

  log('trigger resize event to allow js components to resize properly');
  await browser.execute(triggerResize);

  // hide elements
  if (Array.isArray(options.hide) && options.hide.length) {
    log('hide the following elements: %s', options.hide.join(', '));
    await browser.selectorExecute(options.hide, modifyElements, 'opacity', '0');
  }

  // remove elements
  if (Array.isArray(options.remove) && options.remove.length) {
    log('remove the following elements: %s', options.remove.join(', '));
    await browser.selectorExecute(options.remove, modifyElements, 'display', 'none');
  }

  // scroll back to start
  const x = 0;
  const y = 0;
  log('scroll back to start x: %s, y: %s', x, y);
  await browser.execute(scroll, x, y);

  // wait a bit for browser render
  const pause = 200;
  log('wait %s ms for browser render', pause);
  await browser.pause(pause);
}
