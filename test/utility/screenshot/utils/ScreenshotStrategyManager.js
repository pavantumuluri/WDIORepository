const debug = require('debug');

const MergeViewportStrategy = require('./strategies/MergeScreenshotStrategy.js');
const TrimAndMergeViewportStrategy = require('./strategies/TrimAndMergeScreenshotStrategy.js');
const FullpageScreenshotStrategy = require('./strategies/FullpageScreenshotStrategy.js');

const regexFirefox = /firefox/i;
const regexPhantomjs = /phantomjs/i;

const log = debug('wdio-screenshot:ScreenshotStrategyManager');

function matchBrowserName(browser, regex) {
  return browser.desiredCapabilities && browser.desiredCapabilities.browserName && regex.test(browser.desiredCapabilities.browserName);
}

function isPhantomjs(browser) {
  return matchBrowserName(browser, regexPhantomjs);
}


module.exports = class ScreenshotStrategyManager {

  static getStrategy(browser, screenDimensions) {
    if (isPhantomjs(browser)) {
      log('use full page strategy')
      return new FullpageScreenshotStrategy(screenDimensions);
    }

    const { isIOS } = browser;
    if (isIOS) {
      log('use iOS Trim and Merge viewport strategy')
      return new TrimAndMergeViewportStrategy(screenDimensions);
    }

    log('use merge viewport strategy')
    return new MergeViewportStrategy(screenDimensions);
  }

}
