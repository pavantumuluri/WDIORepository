const fsExtra = require('fs-extra');
const path = require('path');
const debug = require('debug');
const ScreenshotStrategyManager = require('../utils/ScreenshotStrategyManager.js');
const getScreenDimensions = require('../scripts/getScreenDimensions.js');
const virtualScroll = require('../scripts/virtualScroll.js');
const pageHeight = require('../scripts/pageHeight.js');
const generateUUID = require('../utils/generateUUID.js');
const saveBase64Image = require('../utils/saveBase64Image.js');
const { cropImage, mergeImages } = require('../utils/image/index.js');
const ScreenDimension = require('../utils/ScreenDimension.js');
const normalizeScreenshot = require('../utils/normalizeScreenshot.js');
const { __dirname: ___dirname } = require('../utils/constants.js');

const log = debug('wdio-screenshot:makeAreaScreenshot');
const tmpDir = path.join(___dirname, '..', '..', '.tmp');

async function storeScreenshot(browser, screenDimensions, cropDimensions, base64Screenshot, filePath) {
  const normalizedBase64Screenshot = await normalizeScreenshot(browser, screenDimensions, base64Screenshot);
  log('crop screenshot with width: %s, height: %s, offsetX: %s, offsetY: %s', cropDimensions.getWidth(), cropDimensions.getHeight(), cropDimensions.getX(), cropDimensions.getY());

  const croppedBase64Screenshot = await cropImage(normalizedBase64Screenshot, cropDimensions);

  await saveBase64Image(filePath, croppedBase64Screenshot);
}

module.exports = async function makeAreaScreenshot(browser, startX, startY, endX, endY) {
  log('requested a screenshot for the following area: %j', { startX, startY, endX, endY });

  const screenDimensions = await browser.execute(getScreenDimensions);
  log('detected screenDimensions %j', screenDimensions);
  const screenDimension = new ScreenDimension(screenDimensions, browser);

  const screenshotStrategy = ScreenshotStrategyManager.getStrategy(browser, screenDimension);
  screenshotStrategy.setScrollArea(startX, startY, endX, endY);

  const uuid = generateUUID();

  const dir = path.join(tmpDir, uuid);

  try {
    await fsExtra.ensureDir(dir);

    const cropImages = [];
    const screenshotPromises = [];

    log('set page height to %s px', screenDimension.getDocumentHeight());
    await browser.execute(pageHeight, `${screenDimension.getDocumentHeight()}px`);

    let loop = false;
    do {
      const { x, y, indexX, indexY } = screenshotStrategy.getScrollPosition();
      log('scroll to coordinates x: %s, y: %s for index x: %s, y: %s', x, y, indexX, indexY);

      await browser.execute(virtualScroll, x, y, false);
      await browser.pause(100);

      log('take screenshot');
      const base64Screenshot = await browser.takeScreenshot();
      const cropDimensions = screenshotStrategy.getCropDimensions();
      const filePath = path.join(dir, `${indexY}-${indexX}.png`);

      screenshotPromises.push(storeScreenshot(browser, screenDimension, cropDimensions, base64Screenshot, filePath));

      if (!Array.isArray(cropImages[indexY])) {
        cropImages[indexY] = [];
      }

      cropImages[indexY][indexX] = filePath;

      loop = screenshotStrategy.hasNextScrollPosition();
      screenshotStrategy.moveToNextScrollPosition();
    } while (loop)

    const [mergedBase64Screenshot] = await Promise.all([
      Promise.resolve().then(async () => {
        await Promise.all(screenshotPromises);
        log('merge images togehter');
        const mergedBase64Screenshot = await mergeImages(cropImages);
        log('remove temp dir');
        await fsExtra.remove(dir);
        return mergedBase64Screenshot;
      }),
      Promise.resolve().then(async () => {
        log('reset page height');
        await browser.execute(pageHeight, '');

        log('revert scroll to x: %s, y: %s', 0, 0);
        await browser.execute(virtualScroll, 0, 0, true);
      })
    ]);

    return mergedBase64Screenshot;

  } catch (e) {
    try {
      await fsExtra.remove(dir);
    } catch (e) { }

    throw e;
  }

}
