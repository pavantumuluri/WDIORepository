import AllureReporter from '@wdio/allure-reporter'
import path from 'path';
import * as fs from 'fs'

class UtilityPage{


 





async takeScreenShot(stepDescription){
    // AllureReporter.addStep(stepDescription);
     const timestamp = new Date().toISOString().replace(/:/g, '-');
     const originalPath= await 'test/screenshots';
     const doubleBackslashPath = originalPath.replace(/\//g, '\\\\');
     console.log("==========="+doubleBackslashPath)
      const screenshotPath = await path.join(doubleBackslashPath, `screenshot-${timestamp}.png`);

     await browser.saveScreenshot(screenshotPath);

    // AllureReporter.addAttachment('Screenshot', fs.readFileSync(screenshotPath), 'image/png');

    
    AllureReporter.addStep(stepDescription, { name: 'Image', type: 'image/png', content: fs.readFileSync(screenshotPath)});
     return screenshotPath;
}


}


export default new UtilityPage();