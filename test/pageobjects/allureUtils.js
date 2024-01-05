import AllureReporter from '@wdio/allure-reporter';
import path from 'path';
import fs from 'fs';




async function addStepWithScreenshot(stepDescription) {
  
  
  // Add a custom step
 await AllureReporter.addStep(stepDescription, async() => {

  
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const originalPath= global.baseDir+'/test/screenshots';
    //const doubleBackslashPath =  originalPath.replace(/\//g, '\\\\');
   // console.log("==========="+doubleBackslashPath)
     const screenshotPath =  path.join(originalPath, `screenshot-${timestamp}.png`);
     console.log("Saving screenshot to: " + screenshotPath);
    await browser.saveScreenshot(screenshotPath);
    AllureReporter.addAttachment('Screenshot', fs.readFileSync(screenshotPath), 'image/png');
   // return screenshotPath
  });
}

export { addStepWithScreenshot };
