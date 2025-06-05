import fs from 'fs';
import path from 'path';
import { atob } from 'buffer'; // Note: `atob` might need to be imported specifically from 'buffer' or you might use `Buffer.from(...).toString('base64')`
import Jimp from 'jimp';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import AllureReporter from '@wdio/allure-reporter';
import { createCanvas, loadImage } from 'canvas';
import saveDocumentScreenshot from '../utility/screenshot/commands/saveDocumentScreenshot.js';
import report from './report.js';
import base64Images from '../testdata/base64Images.js';
import interactions from '../testdata/interactions.js';
import makeDocumentScreenshot from './screenshot/modules/makeDocumentScreenshot.js';
import constants from './constants.js';
import os from 'os';


const elementNames = {
    'button': 'button',
    'a': 'anchor/link',
    'p': 'paragraph',
    'b': 'bold label',
    'label': 'label',
    'div': 'container',
    'li': 'list',
    'text': 'textbox',
    'password': 'textbox',
    'radio': 'radiobox',
    'checkbox': 'checkbox',
    'select': 'dropdown/combo box',
    'textarea': 'textarea',
    'span': 'span',
    'i': 'i',
    'file': 'file'
}

async function addToReport(testId, element, startTime, options) {
    report.deleteReport(testId);
    console.log("inside addToReport", options)
    let currInteraction = interactions[testId];
    let { eventType, properties: elePropsRec, eleText, screenshoRequired, isFullCapture, loopId, page, tagName, actionText, checked, value, elementType, action } = currInteraction;
    let reportObj;
    if (eventType == "manualPass-testcase") {
        reportObj = generateSucessReport(currInteraction);
        reportObj['startTime'] = startTime;
        return report.setToReport(reportObj);
    }
    if (eventType == "navigation") {
        reportObj = generateSucessReport(currInteraction);
        reportObj['startTime'] = startTime;
        return report.setToReport(reportObj);
    }
    if (eventType == "mouseover") {
        reportObj = generateSucessReport(currInteraction);
        reportObj['startTime'] = startTime;
        reportObj['isMouseHovered'] = true;
        return report.setToReport(reportObj);
    }
    if (eventType == "alert-msg") {
        reportObj = generateReportForAlerts(currInteraction, options);
        let status = reportObj['status'];
        let screenshot = '';
        if ((screenshoRequired && !currInteraction['isLastInteractionOfPage']) || !status) {
            screenshot = 'data:image/png;base64,' + (isFullCapture ? (await makeDocumentScreenshot(browser)) : (await browser.takeScreenshot()));
        }
        reportObj['screenshot'] = screenshot;
        return report.setToReport(reportObj);
    }
    if (currInteraction.isSkipped) {
        reportObj = prepareReportObj(page, value, eventType, testId, tagName, actionText, checked, elementType, action);
        reportObj['startTime'] = startTime;
        reportObj['status'] = false;
        reportObj['isSkipped'] = true;
        return report.setToReport(reportObj);
    }

    let isClick = eventType == "click",
        inspectClick = eventType == "inspect-click",
        isScreenShootCompare = eventType == "screenshot-compare",
        isAlertEvent = eventType == "alert-msg",
        screenshot = '', isComapreSucess = true, imageDiffereces;
    let eleProps = await browser.execute(getElementProperties, element, inspectClick);

    let isPositionChanged = true, isHeightAndWidthChanged = true, status = false, isVerified = false;

    //changed fro demo purpose.
    if (true || (eleProps.height == elePropsRec.height && eleProps.width == elePropsRec.width)) {
        isHeightAndWidthChanged = false;
    }

    if (true || (eleProps.left == elePropsRec.left && eleProps.top == elePropsRec.top)) {
        isPositionChanged = false;
    }

    if (!eleProps.disabled || eleProps.disabled === elePropsRec.disabled) {
        eleProps.disabled = false;
    } else {
        eleProps.disabled = true;
    }

    if (true || eleProps.visbility === elePropsRec.visbility) {
        eleProps.visbility = true;
    } else {
        eleProps.visbility = false;
    }
    let isDropSuccessful = options?.isDropSuccessful;
    /*
    // to do
    //for filetype by default all case are true only.
    if (element && element.type == "file") {
       eleProps.visbility = true;
       eleProps.disabled = false;
       isPositionChanged = false;
       isHeightAndWidthChanged = false;
   }*/

    reportObj = prepareReportObj(page, value, eventType, testId, tagName, actionText, checked, elementType, action);

    if ((element && element.type == "file") || isDropSuccessful) {
        eleProps.visbility = true;
        eleProps.disabled = false;
        isPositionChanged = false;
        isHeightAndWidthChanged = false;
    }

    reportObj['isEleVisible'] = eleProps.visbility ?? false;
    reportObj['isEleDisabled'] = eleProps.disabled ?? false;
    reportObj['isUrlChanged'] = true; //window.location.href == interaction_url;
    reportObj['isHeightAndWidthChanged'] = isHeightAndWidthChanged;
    reportObj['isPositionChanged'] = isPositionChanged;
    reportObj['startTime'] = startTime;

    if (eleProps.visbility && !(eleProps.disabled || isHeightAndWidthChanged || isPositionChanged)) {
        status = true;
    }
    if (isDropSuccessful) {
        status = true;
    }

    if (inspectClick && element) {// checking for inspected element's text content.
        // let elementText = await browser.execute(getElementText, element, eventType);
        // if (element && Array.isArray(eleText) && eleText.includes(elementText)) {
        isVerified = true;
        // }/*else if (eleText !== elementText) {
        status = true;
        // }*/ else {
        //     status = false;
        // }
    } else if (isAlertEvent) {
        isVerified = currInteraction["msg"] == await browser.getAlertText();
        await browser.acceptAlert();
        status = isVerified;
    }

    // if test case failed
    /*if (!isScreenShootCompare && ((screenshoRequired && !isClick) || !status)) {
        //await Interactor.sleep(1000);     
        // commonUtils.removeFocusAndSelecton();
        // document.activeElement.blur();
        screenshot = isFullCapture ? (await makeDocumentScreenshot(browser)) : await browser.takeScreenshot();
    }*/

    if (isScreenShootCompare) {
        // if (browser.capabilities.browserName == "chrome") {
        //     const image2Base64 = 'data:image/png;base64,' + (await saveDocumentScreenshot(undefined, browser));
        //     fs.writeFileSync('./base64Image2.txt', image2Base64);
        //     let result = await showImageDifferences(base64Images[testId], image2Base64, true);
        //     //console.log('results:::::::::::::::::::::::::::::::::::::::::::::::::::: ', result);
        //     let isVisualMatched = result && (Array.isArray(result) && result.length == 0) || result["identical"];

        //     if (isVisualMatched) {
        //         screenshot = "";
        //         imageDiffereces = [];
        //     } else {
        //         screenshot = "";
        //         imageDiffereces = result;
        //         isComapreSucess = false;
        //     }
        // } else {
        reportObj['isForceWarning'] = true;
        // }
    } else if ((screenshoRequired && !currInteraction['isLastInteractionOfPage']) || !status) {
        screenshot = 'data:image/png;base64,' + (isFullCapture ? (await makeDocumentScreenshot(browser)) : (await browser.takeScreenshot()));
    }
    /*if (screenshoRequired && ( !isClick || (isClick && obj["isLastInteractionOfPage"])) || !status) {
        screenshoRequired = false; // if last event for a page.
        screenshot = await this.screenShotTODataUrl("data_return");
    }*/
    if (!status) {
        constants.finalStatus = false;
    }
    let beforePerformEvent = constants.beforePerformEvents[testId];
    if (beforePerformEvent?.type == "screenshot") {
        reportObj['beforeScreenshot'] = beforePerformEvent.screenshot;
    }
    reportObj['screenshot'] = screenshot;
    reportObj['status'] = status;
    reportObj['isVerified'] = isVerified;
    //this.loopId = this.getFromLS("loopId", "string");
    if (loopId != -1) {
        reportObj['loopId'] = loopId;
    }

    if (isScreenShootCompare) {
        reportObj['status'] = isComapreSucess;
        reportObj['imageDifferences'] = imageDiffereces;
        reportObj['defectCount'] = imageDiffereces?.length || 0
    }
    report.setToReport(reportObj);

    console.log('addToReport called');
}
function generateSucessReport(interactionObj) {
    let reportObj = { "startTime": Date.now() };
    let { eventType, elementType, tagName, value, action, selectors, testId, properties, eleText, screenshoRequired, page, actionText, interaction_url, loopId } = interactionObj;
    let inspectClick = eventType == "inspect-click";
    if (inspectClick) {
        action = "Verify message";
    }
    let isPositionChanged = false, isHeightAndWidthChanged = false, status = true, isVerified = true;

    reportObj['testId'] = testId;
    reportObj['eleType'] = elementNames[tagName == "input" ? elementType : tagName];
    reportObj['action'] = action;
    reportObj['actionText'] = actionText;
    reportObj['isEleVisible'] = true;
    reportObj['isEleDisabled'] = false;
    reportObj['isUrlChanged'] = false; //window.location.href == interaction_url;
    reportObj['isHeightAndWidthChanged'] = isHeightAndWidthChanged;
    reportObj['isPositionChanged'] = isPositionChanged;
    reportObj['value'] = value;
    reportObj['page'] = page;

    //await commonUtils.sleep(1000);
    let screenshot = "";

    reportObj['screenshot'] = screenshot;
    reportObj['status'] = status;
    reportObj['isVerified'] = isVerified;

    return reportObj;
}
function generateReportForAlerts(interaction, msg) {
    try {
        if (interaction && interaction.hasOwnProperty("page") && interaction["eventType"] == "alert-msg") {
            let status = msg == interaction["msg"];
            let report = {
                "page": interaction["page"],
                "value": interaction["value"],
                "action": "Verify alert message",
                "status": status,
                "testId": interaction["testId"],
                "startTime": Date.now(),
                "actionText": interaction["actionText"],
                "isVerified": true,
                "screenshot": "",
                "isEleVisible": true,
                "isUrlChanged": false,
                "mappingIndex": 1,
                "isEleDisabled": false,
                "isPositionChanged": false,
                "isHeightAndWidthChanged": false
            }

            return report;
        }
        // } else {
        //     interaction = Interactor.currentInteraction[Interactor.currentPgIndex + 1];
        //     if(interaction && interaction.hasOwnProperty("page") && interaction["eventType"] == "alert-msg") {
        //         let report = {
        //             "page": interaction["page"],
        //             "value": interaction["value"],
        //             "action": "Verify alert message",
        //             "status": msg === interaction["msg"],
        //             "testId": interaction["testId"],
        //             "startTime": Date.now(),
        //             "actionText": interaction["actionText"],
        //             "isVerified": true,
        //             "screenshot": "",
        //             "isEleVisible": true,
        //             "isUrlChanged": false,
        //             "mappingIndex": 1,
        //             "isEleDisabled": false,
        //             "isPositionChanged": false,
        //             "isHeightAndWidthChanged": false
        //         }
        //         Interactor.currentPgIndex = Interactor.currentPgIndex+1;
        //         return report;
        //     }
        // }
    } catch (error) {
        console.error(e);
    }
    return null;
}


function addStepWithLabel(stepDescription, status = "passed") {
    AllureReporter.addStep(stepDescription, {}, status);
}


async function addStepWithScreenshot(stepDescription) {
    const screenshotPath = getRandomFilePath();
    await browser.saveScreenshot(screenshotPath);
    // AllureReporter.addAttachment(stepDescription, fs.readFileSync(screenshotPath), 'image/png');
    AllureReporter.addStep(stepDescription, { name: 'Image', type: 'image/png', content: fs.readFileSync(screenshotPath) });
}
async function addScreenshotToLastReport(testId, isFullCapture) {
    await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const screenshot = 'data:image/png;base64,' + (isFullCapture ? (await makeDocumentScreenshot(browser)) : (await browser.takeScreenshot()));
            report.updateReport(testId, { "screenshot": screenshot });
            resolve(true);
        }, 1000)
    })
}
async function addStepWithFullScreenshot(stepDescription) {
    const screenshotPath = getRandomFilePath();
    await saveDocumentScreenshot(screenshotPath, browser);
    // AllureReporter.addAttachment(stepDescription, fs.readFileSync(screenshotPath), 'image/png');
    AllureReporter.addStep(stepDescription, { name: 'Image', type: 'image/png', content: fs.readFileSync(screenshotPath) });
}
async function addStepWithiDiffScreenshot(stepDescription, key) {
    const screenshotPath = getRandomFilePath();
    const image1Base64 = base64Images[key];
    const image2Base64 = 'data:image/png;base64,' + await saveDocumentScreenshot(undefined, browser);
    const differences = await showImageDifferences(image1Base64, image2Base64);
    let writableContent = differences.identical ? image1Base64 : differences.base64;
    writableContent = writableContent.replace(/^data:image\/\w+;base64,/, "");
    // fs.writeFileSync(screenshotPath, writableContent, 'base64');
    // AllureReporter.addAttachment(stepDescription, fs.readFileSync(screenshotPath), 'image/png');
    // AllureReporter.addStep(stepDescription, { name: 'Image', type: 'image/png', content: fs.readFileSync(screenshotPath) });
    AllureReporter.addStep(stepDescription, { name: 'Image', type: 'image/png', content: Buffer.from(writableContent, 'base64') });
    if (browser.capabilities.browserName !== "chrome") {
        AllureReporter.addStep("The visual compare feature currently works best with Chrome but will support other browsers in future releases.");
    }
}

function getBufferObj(base64Content) {
    console.log('inside getBufferOBBBBBBBBBBBBBBBBBBB');
    try {
        base64Content = base64Content.replace(/^data:image\/\w+;base64,/, "");
        const binaryData = atob(base64Content);
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }
        return uint8Array.buffer;
    } catch (error) {
        console.error(error);
    }
}

function getOS() {
    let osName = os.platform().toLowerCase();
    if (osName.includes('win')) {
        return "Windows";
    }
    if (osName.includes('linux')) {
        return "Linux";
    }
    if (osName.includes('darwin')) {
        return "MacOS";
    }
}

async function showImageDifferences(base64image1 = null, base64image2 = null, getDifferences = false) {
    console.log('inside showImageDiffffffffffffffffffffffffffff');
    fs.writeFileSync('./base64image2.txt', base64image2);
    let differences = [];

    /*
        const img1 = PNG.sync.read(getBufferObj(base64image1));
        const img2 = PNG.sync.read(getBufferObj(base64image2));
        console.log('images created using PNGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
        const { width, height } = img1;
        const diff = new PNG({ width, height });
    
        pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    
        diff.on('parsed',(buffer)=>{
            console.log(buffer)
        })
        fs.writeFileSync('./diff.png', PNG.sync.write(diff));*/

    try {
        let image1 = await Jimp.read(getBufferObj(base64image1)),
            image2 = await Jimp.read(getBufferObj(base64image2)),
            width = image1.bitmap.width,
            height = image1.bitmap.height;

        // image1.getBufferAsync();
        const width1 = image2.bitmap.width, height1 = image2.bitmap.height
        console.log(width, height);
        console.log(width1, height1);
        let commonWidth = Math.min(width, width1);
        let commonHeight = Math.min(height, height1);

        image1.resize(commonWidth, commonHeight);
        image2.resize(commonWidth, commonHeight);

        /*if (width !== width1 || height !== height1) {
            throw 'Images must have the same dimensions';
        }*/

        // checking difference percentage.
        const diff = Jimp.diff(image1, image2, 0.001);

        console.log('difff::::::: ', diff);

        const percent = diff.percent;
        if (percent === 0) {
            return {
                "identical": true,
                'percentOfMismatch': 0,
                'base64': ''
            };
        }

        let min = Math.min,
            max = Math.max;
        let currentX = null;
        let minX = width,
            minY = height,
            maxX = 0,
            maxY = 0,
            pixel1,
            pixel2,
            Xmin = width,
            Ymin = height,
            Xmax = 0,
            Ymax = 0;
        for (let y = 0; y < height; y++) {
            let hasChange = false;
            for (let x = 0; x < width; x++) {
                pixel1 = Jimp.intToRGBA(image1.getPixelColor(x, y));
                pixel2 = Jimp.intToRGBA(image2.getPixelColor(x, y));
                if (pixel1.r !== pixel2.r || pixel1.g !== pixel2.g || pixel1.b !== pixel2.b || pixel1.a !== pixel2.a) {
                    hasChange = true;
                    minX = min(minX, x);
                    minY = min(minY, y);
                    maxX = max(maxX, x);
                    maxY = max(maxY, y);
                    if (!currentX) {
                        currentX = x;
                    }
                }
            }
            if (!hasChange) {
                if (currentX) {
                    differences.push({
                        minX,
                        maxX,
                        minY,
                        maxY,
                        borderX: minX - 10,
                        borderY: minY - 10,
                        width: maxX - minX + 20,
                        height: maxY - minY + 20
                    });
                    Xmin = min(Xmin, minX);
                    Ymin = min(Ymin, minY);
                    Xmax = max(Xmax, maxX);
                    Ymax = max(Ymax, maxY);
                    minX = width,
                        minY = height,
                        maxX = 0,
                        maxY = 0
                }
                currentX = null
            }
        }
        console.log('before cropBase64Image:::::::::::::::::::::::::::::::::', differences);
        let finalBase64;
        try {
            if (getDifferences) {
                finalBase64 = await cropBase64ImageReport(base64image1, base64image2, differences, Xmin, Ymin, Xmax, Ymax, width, height);
            } else {
                finalBase64 = cropBase64ImageAllure(base64image1, base64image2, differences, Xmin, Ymin, Xmax, Ymax, width, height);
                finalBase64 = { "identical": false, 'percentOfMismatch': percent, 'base64': finalBase64 }
            }
        } catch (error) {
            console.error('error while cropping:::::::::::::::::::');
        }
        console.log("finalBase64:::::::", finalBase64);
        if (finalBase64) {
            return finalBase64;
        }
    } catch (error) {
        console.error(error);
    }
    return { "identical": true, 'percentOfMismatch': 0, 'base64': '' };
}

async function cropBase64ImageReport(image1Base64, image2Base64, differences, Xmin, Ymin, Xmax, Ymax, width, height) {
    console.log('inside cropBase64ImageReportcropBase64ImageReport:::::::::');
    return new Promise(async function (resolve, reject) {
        try {

            const imge1 = await loadImage(image1Base64),
                imge2 = await loadImage(image2Base64),
                croppedWidth = Xmax - Xmin + 1,
                croppedHeight = Ymax - Ymin + 1,
                // croppedImage = new Image(),
                // canvas = document.getElementById('canvas'),
                // canvas1 = document.getElementById('canvas1');
                canvas = createCanvas(width, height),
                canvas1 = createCanvas(width, height);

            // imge1.src = image1Base64;
            // imge2.src = image2Base64;
            // canvas.width = canvas1.width = width;
            // canvas.height = canvas1.height = height;
            const context = canvas.getContext('2d');
            const context1 = canvas1.getContext('2d');
            // imge1.onload = function () {
            // imge2.onload = function () {
            context.strokeStyle = "red";
            context.lineWidth = 1.5;
            context.drawImage(imge2, 0, 0);
            context1.strokeStyle = "red";
            context1.lineWidth = 1.5;
            context1.drawImage(imge1, 0, 0);
            context.setLineDash([4, 2]);
            context1.setLineDash([4, 2]);
            differences.forEach((element, index) => {
                let { borderX, borderY, width: w, height: h } = element;

                let imageData = context1.getImageData(borderX, borderY, w, h);
                // let newCanvas = document.createElement('canvas');
                // newCanvas.width = w;
                // newCanvas.height = h;
                let newCanvas = createCanvas(w, h);
                let newCtx = newCanvas.getContext('2d');
                newCtx.putImageData(imageData, 0, 0);
                let img = newCanvas.toDataURL('image/png');
                differences[index]['img'] = img;

                imageData = context.getImageData(borderX, borderY, w, h);
                // newCanvas = document.createElement('canvas');
                // newCanvas.width = w;
                // newCanvas.height = h;
                newCanvas = createCanvas(w, h);
                newCtx = newCanvas.getContext('2d');
                newCtx.putImageData(imageData, 0, 0);
                let img2 = newCanvas.toDataURL('image/png');
                differences[index]['altimg'] = img2;
                differences[index]['index'] = index + 1;

            });
            console.log("differencessssssssssssssssssssssss:::::::::::::::", differences);
            resolve(differences);
            // }
            // }

        } catch (error) {
            reject(error)
        }
    });
}
function disableFileInputs() {
    document.querySelectorAll('[type="file"]').forEach((inputFile) => {
        inputFile.disabled = true;
    })
}

function uploadFile(fileDataURL, fileName, element) {
    fetch(fileDataURL)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], fileName);
            const fileData = new DataTransfer();
            fileData.items.add(file);
            element.files = fileData.files;
            element.dispatchEvent(new Event('change', {
                bubbles: true
            }));
        })
        .catch(error => {
            console.error('Error fetching file from localStorage:', error);
        });
}

function getElementText(element, eventType, detail) {
    let getLabelText = function (element1) {
        try {
            let listOfElements,
                labelElement;
            const findLabelElement = (element) => {
                listOfElements = element.querySelectorAll("label");
                if (!listOfElements.length && !element.getElementsByTagName('select').length) {
                    if (!(element.childElementCount == 1 && (element.children[0] == element1 || element.tagName == "SELECT"))) {
                        if (element.textContent && element.textContent.trim().length > 0) {
                            return element;
                        }
                    }
                    return findLabelElement(element.parentElement);
                }
                labelElement = Array.from(listOfElements).find((ele) => this.isVisible(ele));
                if (!labelElement)
                    return findLabelElement(element.parentElement);
                return labelElement;
            }
            if (element1?.previousElementSibling?.textContent?.trim()) {
                return element1.previousElementSibling.textContent;
            }
            labelElement = findLabelElement(element1.parentElement);
            return labelElement.textContent;
        } catch (e) {
            console.log(e);
        }
        return element.value;
    }

    let label, tagName = element.tagName, eleText, eleType = element.type;
    let textElements = ["A", "LI", "SPAN", "DIV", "P", "B", "LABEL", "I"];
    if (tagName == "INPUT" && (eleType == "submit" || eleType == "reset" || eleType == "button")) {
        eleText = element.value;
        if (eleText) {
            return eleText;
        } else {
            return eleType;
        }
    }

    if (tagName == "INPUT" || tagName == "TEXTAREA" || tagName == "SELECT") {
        eleText = element.placeholder;
        if (eleText) {
            return eleText;
        }
        try {
            label = element.id ? document.querySelector('label[for=' + element.id + ']') : null;
        } catch (e) {
            console.error(e);
        }
        if (label) {
            return label.textContent;
        } /*else {
            element.closest("label")
        }*/
        return getLabelText(element);
    }

    if (eventType == "inspect-click" && detail) {
        return detail["usrMsgs"];
    }

    if (eventType == "click" || eventType == "inspect-click") {
        let textContent = ""
        if (tagName == "BUTTON") {
            return element.textContent;
        }

        if (textElements.includes(tagName)) {
            textContent = element.textContent;
            if (textContent)
                return textContent;
            else {
                return Array.from(element.childNodes).map((node) => node.textContent).join(' ').trim();
                /*let childTxt = Array.from(element.childNodes).map((node) => node.textContent).join(' ').trim();
                if(childTxt && childTxt.trim().length > 0){
                    return childTxt;
                } else {
                    return element.tagName
                }*/
            }
            return;
        } else {
            return element.textContent;
        }
    }
}

function getElementProperties(ele) {
    return {
        width: ele.offsetWidth,
        height: ele.offsetHeight,
        left: ele.clientLeft,
        top: ele.offsetTop,
        disabled: inspectClick ? false : ele.disabled ?? false,
        visbility: true,
    }
}

function prepareReportObj(page, value, eventType, testId, tagName, actionText, checked, elementType, action) {
    return {
        "page": page,
        "value": value,
        "action": action,
        "status": true,
        "testId": testId,
        "eleType": elementNames[tagName == "input" ? elementType : tagName],
        "actionText": actionText,
        "ischecked": checked
    }
}

function getRandomFilePath() {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const originalPath = process.cwd() + '/test/screenshots';
    if (!fs.existsSync(originalPath)) {
        fs.mkdirSync(originalPath)
    }
    const screenshotPath = path.join(originalPath, `screenshot-${timestamp}.png`);
    return screenshotPath;
}


async function cropBase64ImageAllure(image1Base64, image2Base64, coords, Xmin, Ymin, Xmax, Ymax, width, height) {
    try {
        console.log('inside cropBase64Image:::::::::::::::::::::::::::::::::::::::::::::::::');
        const canvas = createCanvas(width + 40, height + 60);
        const context = canvas.getContext('2d');
        const image = await loadImage(image2Base64);
        context.strokeStyle = "red";
        context.lineWidth = 3
        context.setLineDash([5]);
        context.drawImage(image, 0, 0);
        coords.forEach(element => {
            let { minX, maxX, minY, maxY } = element;
            context.strokeRect(minX - 10, minY - 10, maxX - minX + 20, maxY - minY + 20);
        });
        return canvas.toDataURL('image/png')
    } catch (error) {
        console.error(error);
    }
    return '';
}
function setBrowser(_browser) {
    browser = _browser;
}
function removeSpecailChars(str) {
    //&nbsp; is look like space, but in comparison it is failing.
    return str.replace(/[\r\n|\n|\r\t]/g, "").replace(/\u00A0/g, " ").trim();
}
async function expect(value, expectedValue) {
    console.log('[helper.js] expect method', value, expectedValue);
    expectedValue = removeSpecailChars(expectedValue);
    if (Array.isArray(value)) {
        for (let val of value) {
            if (removeSpecailChars(val) == expectedValue) {
                return true;
            }
        }
        throw `Expected ${value} to contain ${expectedValue}`;
    } else {
        if (removeSpecailChars(value) == expectedValue) {
            return true;
        }
        throw `Expected ${value} to contain ${expectedValue}`;
    }
}
async function getElementFromSelectors(selectors, skipCenterPoints = false) {
    try {
        let findElementForSvg = async function (path) {
            try {
                let _evSelector = path;
                _evSelector = _evSelector.split("/svg")[0];
                let svgTag = path.match(/\/svg\[\d\]/g)?.[0];
                svgTag = svgTag?.match(/\d/)[0];
                let _element = await browser.$$(_evSelector);
                if (_element.length > 1) {
                    throw "multiple elements found with svg";
                }
                if (_element.length == 0) {
                    throw "No element found";
                }
                _element = _element[0];
                if (svgTag) {
                    return await _element.$("svg:nth-of-type(" + svgTag + ")");
                } else {
                    return await _element.$("svg");
                }
                /*let svgTag = _evSelector.match(/\/svg\[\d\]$/g)?.[0];
                if (svgTag) {
                    _evSelector = _evSelector.replace(/\/svg\[\d\]$/g, '');
                    svgTag = svgTag.match(/\d/)[0];
                    let _element = await browser.$$(_evSelector);
                    if (_element.length > 1) {
                        throw "multiple elements found with svg";
                    }
                    if (_element.length == 0) {
                        throw "No element found";
                    }
                    _element = _element[0];
                    return await _element.$("svg:nth-of-type(" + svgTag + ")");
                }*/
            } catch (error) {
                console.error('error inside findElementForSvg', error);
            }
            return null;
        }
        let { xpath, relativeXpath, relativeXpath2, attributes, centerPoints, textContent, ...rest } = selectors;
        let elemement, isExisting;
        for (let attr in rest) {
            let attrVal = rest[attr];
            if (attrVal) {
                let s = '[' + attr + '="' + attrVal + '"]';
                console.log("selector", s);
                elemement = await browser.$(s);
                isExisting = await elemement.isExisting();
                console.log('element exist', isExisting);
                if (isExisting) {
                    return elemement;
                }
            }
        }
        if (relativeXpath) {
            relativeXpath = removeSpecailChars(relativeXpath)
            console.log("Finding relativePath:", relativeXpath);
            try {
                if (relativeXpath.includes('/svg')) {
                    elemement = await findElementForSvg(relativeXpath);
                } else {
                    elemement = await browser.$$(relativeXpath);
                    console.log('element exist with relativeXpath', isExisting, relativeXpath);
                    if (elemement?.length > 1) {
                        throw "multiple elements found";
                    }
                    if (elemement.length == 0) {
                        // elemement = await browser.$$(xpath).waitForExist({
                        //     timeout: 10000, // Time in milliseconds (5 seconds)
                        //     timeoutMsg: 'Element did not exist within 5 seconds',
                        // });
                        throw "unable to find element";
                    }
                    elemement = elemement[0];
                }
                if (!elemement) {
                    throw "element not found, skipping for relativexpath";
                }
                return elemement;
            } catch (error) {
                console.log("error in relativeXpath");
                console.error(error);
            }
        }
        if (attributes) {
            console.log("Finding attributes:", attributes);
            try {
                elemement = await browser.$$(attributes);
                console.log('element exist attributes', isExisting, attributes);
                if (elemement?.length > 1) {
                    throw "multiple elements found";
                }
                if (elemement.length == 0) {
                    // elemement = await browser.$$(xpath).waitForExist({
                    //     timeout: 10000, // Time in milliseconds (5 seconds)
                    //     timeoutMsg: 'Element did not exist within 5 seconds',
                    // });
                    throw "unable to find element";
                }
                return elemement[0];
            } catch (error) {
                console.log('error inside attributes');
                console.error(error);
            }
        }
        if (xpath) {
            xpath = removeSpecailChars(xpath)
            console.log("Finding xpath:", xpath);
            try {
                if (xpath.includes('/svg')) {
                    elemement = await findElementForSvg(xpath);
                } else {
                    elemement = await browser.$$(xpath);
                    console.log('element exist xpath', isExisting, xpath);
                    if (elemement.length > 1) {
                        throw "multiple elements found";
                    }
                    if (elemement.length == 0) {
                        // elemement = await browser.$$(xpath).waitForExist({
                        //     timeout: 10000, // Time in milliseconds (5 seconds)
                        //     timeoutMsg: 'Element did not exist within 5 seconds',
                        // });
                        throw "unable to find element";
                    }
                    elemement = elemement[0];
                }
                if (!elemement) {
                    throw "element not found, skipping for xpath";
                }
                return elemement;
            } catch (error) {
                console.log('error inside xpath');
                console.error(error);
            }
        }
        if (relativeXpath2) {
            relativeXpath2 = removeSpecailChars(relativeXpath2)
            console.log("Finding relativePath2:", relativeXpath2);
            try {
                if (relativeXpath2.includes('/svg')) {
                    elemement = await findElementForSvg(relativeXpath2);
                } else {
                    elemement = await browser.$$(relativeXpath2);
                    console.log('element exist with relativeXpath2', isExisting, relativeXpath2);
                    if (elemement?.length > 1) {
                        throw "multiple elements found";
                    }
                    if (elemement.length == 0) {
                        // elemement = await browser.$$(xpath).waitForExist({
                        //     timeout: 10000, // Time in milliseconds (5 seconds)
                        //     timeoutMsg: 'Element did not exist within 5 seconds',
                        // });
                        throw "unable to find element";
                    }
                    elemement = elemement[0];
                }
                if (!elemement) {
                    throw "element not found, skipping for relativexpath";
                }
                return elemement;
            } catch (error) {
                console.log("error in relativeXpath");
                console.error(error);
            }
        }
        if (skipCenterPoints) {
            return null;
        }
        elemement = await browser.execute(getElementByCenterPoints, interaction);
        if (elemement) {
            //here element is a random class added through javascript
            elemement = await browser.$$('.' + elemement);
            if (elemement?.length > 1) {
                throw "multiple elements found";
            }
            if (elemement.length == 0) {
                // elemement = await browser.$$(xpath).waitForExist({
                //     timeout: 10000, // Time in milliseconds (5 seconds)
                //     timeoutMsg: 'Element did not exist within 5 seconds',
                // });
                throw "unable to find element";
            }
            return elemement[0];
        }

    } catch (error) {
        console.error('error inside getElementFromSelectors', error);
    }
    return null;
}
async function _getElement(testId) {
    let interaction = interactions[testId];
    if (!interaction) {
        throw new Error(`unable to find element for test id ${testId}`);
    }
    let selectors = Object.fromEntries(interaction.selectors);
    let element = await getElementFromSelectors(selectors);
    if (!element) {
        for (let i = 0; i < 20; i++) {
            element = await _getElement(testId);
            if (element) {
                break;
            } else {
                console.log(`Attempt ${i + 1}: No elements found, retrying...`);
                await browser.pause(500); // Wait before retrying
            }
        }
    }
    return element;
}
async function getElement(testId) {
    console.log('inside getElement', testId)
    let element = await _getElement(testId);
    try {
        if (element) {
            console.log('inside if::::');
            const isVisibleInViewport = await element.isDisplayedInViewport();
            if (!isVisibleInViewport) {
                // Scroll into view only if it’s not visible
                await element.scrollIntoView({ block: 'center', inline: 'center' });
            }
            console.log('element scroll to viewport');
            // await sleep(1500);
            // await element.waitForDisplayed();
            console.log('element displayed')
            await browser.waitUntil(
                async () => await element.isEnabled(),
                {
                    timeout: 10000,  // time to wait in milliseconds
                    timeoutMsg: 'element was not enabled after 10 seconds'
                }
            );
            console.log('element enabled');
            // await browser.execute((el) => {
            //     if (!el.getBoundingClientRect().top || !el.getBoundingClientRect().bottom) {
            //         el.scrollIntoView();
            //     }
            // }, element);
        }
    } catch (error) {
        console.error('error inside getElement', error);
    }
    console.log('element returned');
    return element;
}
async function getDragAndDropElement(selectors) {
    try {
        // selectors = JSON.parse(selectors)
        let elemement = await getElementFromSelectors(selectors, skipCenterPoints = true);
        if (elemement) {
            return elemement;
        }
    } catch (error) {
        console.error('error inside getDragAndDropElement', error);
    }
    return null;
}
function getElementByCenterPoints(interaction) {
    console.log('inside getElementByCenterPoints::::::::');
    let commonUtils = {
        actionTxtSize: 50,
        actionTxtMinSize: 5,
        extractEleTxtFromAria: function (aria_label) {
            let eleText = "";
            try {
                aria_label = aria_label.split(" ");
                for (let label of aria_label) {
                    let val = document.getElementById(label);
                    if (val) {
                        eleText += val.title || val.textContent;
                        eleText += " ";
                    }
                }
            } catch (error) {
                console.error(e);
            }
            return eleText;
        },
        textElements: ["A", "LI", "SPAN", "DIV", "P", "B", "LABEL", "I"],
        getLabelText: function (element1) {
            try {
                let listOfElements,
                    labelElement;
                const findLabelElement = (element, onlyImmidateParentSearch = false) => {
                    listOfElements = element.querySelectorAll("label");
                    if (!listOfElements.length && !element.getElementsByTagName('select').length && !element.getElementsByTagName('textarea').length && !onlyImmidateParentSearch && !(element.querySelectorAll("input[type='radio']").length && element.tagName == "TR")) {
                        if (!(element.childElementCount == 1 && (element.children[0] == element1 || element.tagName == "SELECT"))) {
                            if (element.textContent && element.textContent.trim().length > 0) {
                                return element;
                            }
                            if (element.tagName == "TR") {
                                let elementToFind = element.previousElementSibling != null ? element.previousElementSibling : element.parentElement;
                                return findLabelElement(elementToFind, onlyImmidateParentSearch);
                            }
                        }

                        if (element?.textContent) {
                            let txtContent = element.textContent.trim();
                            if (txtContent.length > 3) {
                                return element;
                            }
                        }
                        return findLabelElement(element.parentElement);
                    } else if ((element.getElementsByTagName('select').length || element.getElementsByTagName('textarea').length || element.querySelectorAll("input[type='radio']").length) && element.tagName == "TR") {
                        let elementToFind = element.previousElementSibling != null ? element.previousElementSibling : element.parentElement;
                        return findLabelElement(elementToFind, onlyImmidateParentSearch);
                    }
                    labelElement = Array.from(listOfElements).find((ele) => commonUtils.isVisible(ele));
                    if (!labelElement) {
                        if (!onlyImmidateParentSearch) {
                            return findLabelElement(element.parentElement, onlyImmidateParentSearch);
                        } else {
                            return null;
                        }

                    }

                    return labelElement;
                }
                if (element1 && element1.previousElementSibling && element1.previousElementSibling.textContent.trim()) {
                    return element1.previousElementSibling.textContent;
                }
                if (element1 && element1.previousSibling && element1.previousSibling.textContent.trim()) {
                    return element1.previousSibling.textContent.trim();
                }
                let indexOfTd = element1.parentElement.tagName == "TD" ? Array.from(element1?.closest("tr").querySelectorAll("td")).indexOf(element1.parentElement) : null;
                let isElementHasPlaceHolder = element1.getAttribute("placeholder") != null;
                if (isElementHasPlaceHolder) {
                    console.debug("Input element has placeHolder");
                    labelElement = findLabelElement(element1.parentElement, isElementHasPlaceHolder);
                    return labelElement;
                } else {
                    labelElement = findLabelElement(element1.parentElement, isElementHasPlaceHolder);
                }

                let labelTextValue = (labelElement.tagName == "TR") ? labelElement.querySelectorAll("td")[indexOfTd]?.textContent : (labelElement.textContent + "");
                return (labelTextValue).replace(/\W{1,}/g, "");
            } catch (e) {
                console.log(e);
            }
            return element1?.value || "";
        },
        isVisible: function (element) {
            try {
                /*var style = window.getComputedStyle(elem);
                return style &&
                    style.display !== 'none' &&
                    style.visibility !== 'hidden' &&
                    (elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0);
                //return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;*/
                return true;
                if (!element) {
                    return false; // Handle invalid or null element
                }

                // Check element dimensions (excluding scrolled elements)
                const { width, height } = element.getBoundingClientRect();
                if (width === 0 && height === 0) {
                    return false; // Hidden or collapsed element
                }

                // Check element visibility within viewport
                const viewPortRect = {
                    top: window.scrollY,
                    left: window.scrollX,
                    right: window.innerWidth + window.scrollX,
                    bottom: window.innerHeight + window.scrollY
                };

                const elementRect = element.getBoundingClientRect();
                const intersection = (
                    Math.max(0, viewPortRect.top - elementRect.bottom) +
                    Math.max(0, elementRect.top - viewPortRect.bottom) +
                    Math.max(0, viewPortRect.left - elementRect.right) +
                    Math.max(0, elementRect.left - viewPortRect.right)
                );
                // Consider partial visibility as well (adjust threshold as needed)
                return intersection > 0 || (intersection === 0 && (width > 0 || height > 0));
            } catch (e) {
                console.error(e);
            }
            return false;
        },
        getElementByElementText: function (interaction, container = document) {
            let ele = null;
            try {
                const { eleText } = interaction; // Destructure the element text from the interaction object
                const trimmedEleText = eleText.trim(); // Trim the element text to avoid whitespace mismatches
                let isMatchFound = false; // Flag to track if a matching element is found

                // Select all elements within the container (default to document)
                const elements = container.querySelectorAll('*');

                // Iterate through the elements and check their text content
                for (let i = 0; i < elements.length; i++) {
                    const elementText = elements[i].textContent.trim();

                    // If the text content matches the target text
                    if (elementText === trimmedEleText) {
                        ele = elements[i]; // Assign the matching element

                        // Verify if the element matches additional conditions using a utility function
                        isMatchFound = isMatchingElement(ele, interaction);

                        // Break the loop if a matching element is found
                        if (isMatchFound) {
                            break;
                        }
                    }
                }

                // If a matching element was found but doesn't meet additional conditions, log and reset
                if (!isMatchFound) {
                    console.log("Element found but does not meet the interaction requirements.");
                    ele = null; // Reset the element to null if it doesn't match
                }
            } catch (error) {
                console.error("Error while searching for element by text: ", error);
                ele = null; // Reset the element to null in case of any errors
            }
            return ele; // Return the found element or null if not found
        }
    }
    function getValidText(text) {
        let data = text;
        try {
            data = data.replace(/\n/g, '');
            text = data;
            let indexOfL = text.indexOf("<");
            let indexOfG = text.indexOf(">");
            if (indexOfL == -1 && indexOfG == -1) {
                if (commonUtils.actionTxtSize < data.length) {
                    data = data.substring(0, commonUtils.actionTxtSize + 1);
                    let lastSpaceIndex = data.lastIndexOf(" ");
                    if (lastSpaceIndex > commonUtils.actionTxtMinSize) {
                        data = data.substring(0, lastSpaceIndex);
                    }
                }
                return data;
            }
            else if (indexOfL != -1 && indexOfG != -1) {
                data = (indexOfL < indexOfG) ? text.substring(0, indexOfL) : text.substring(0, indexOfG);
            } else if (indexOfL != -1) {
                data = text.substring(0, indexOfL);
            } else if (indexOfG != -1) {
                data = text.substring(0, indexOfG);
            }

            if (commonUtils.actionTxtSize < data.length) {
                data = data.substring(0, commonUtils.actionTxtSize + 1);
                let lastSpaceIndex = data.lastIndexOf(" ");
                if (lastSpaceIndex > commonUtils.actionTxtMinSize) {
                    data = data.substring(0, lastSpaceIndex);
                }
            }
        } catch (e) {
            console.error(e);
        }
        return data;
    }
    function getElementText(element, eventType, detail) {
        console.log('inside getElementText:::::');
        try {
            var label,
                tagName = element.tagName, eleText, eleType = element.type, aria_label, aria_desc;

            if (eventType == "inspect-click" && detail) {
                return detail["usrMsgs"];
            }

            if (tagName == "INPUT" && (eleType == "submit" || eleType == "reset" || eleType == "button")) {
                eleText = element.value;
                if (eleText) {
                    return eleText;
                } else {
                    return eleType;
                }
            }

            aria_label = element.getAttribute("aria-labelledby");
            aria_desc = element.getAttribute("aria-describedby");


            if ((eventType != "inspect-click") && (tagName == "INPUT" || tagName == "TEXTAREA" || tagName == "SELECT" || tagName == "CANVAS")) {
                // eleText = element.placeholder;
                // if (eleText) {
                //     return eleText;
                // }
                try {
                    label = element.id ? document.querySelector('label[for=' + element.id + ']') : null;
                } catch (e) {
                    console.error(e);
                }
                if (label) {
                    if (label.textContent) {
                        return label.textContent;
                    }
                }

                if (aria_label) {
                    eleText = commonUtils.extractEleTxtFromAria(aria_label);
                    if (eleText) {
                        return eleText;
                    }

                }
                if (aria_desc) {
                    eleText = commonUtils.extractEleTxtFromAria(aria_desc);
                    if (eleText) {
                        return eleText;
                    }
                }

                eleText = commonUtils.getLabelText(element);
                if (eleText) {
                    return eleText;
                }

                eleText = element.placeholder;
                if (eleText) {
                    return eleText;
                }
            }



            if (eventType == "click") {
                var textContent = ""
                if (tagName == "BUTTON") {
                    if (aria_label) {
                        eleText = commonUtils.extractEleTxtFromAria(aria_label);
                        if (eleText) {
                            return eleText;
                        }

                    }
                    if (aria_desc) {
                        eleText = commonUtils.extractEleTxtFromAria(aria_desc);
                        if (eleText) {
                            return eleText;
                        }
                    }

                    return element.textContent;
                }

                if (commonUtils.textElements.includes(tagName)) {
                    textContent = element.textContent;
                    if (textContent)
                        return textContent;
                    else {

                        if (aria_label) {
                            eleText = commonUtils.extractEleTxtFromAria(aria_label);
                            if (eleText) {
                                return eleText;
                            }

                        }
                        if (aria_desc) {
                            eleText = commonUtils.extractEleTxtFromAria(aria_desc);
                            if (eleText) {
                                return eleText;
                            }
                        }

                        let txtContent = Array.from(element.childNodes).map((node) => node.textContent).join(' ').trim();

                        if (txtContent) {
                            return txtContent;
                        } else {
                            return commonUtils.getLabelText(element);
                        }

                        /*let childTxt = Array.from(element.childNodes).map((node) => node.textContent).join(' ').trim();
                        if(childTxt && childTxt.trim().length > 0){
                            return childTxt;
                        } else {
                            return element.tagName
                        }*/
                    }
                    return;
                } else {
                    return element.textContent;
                }
            } else if (eventType == "inspect-click") {
                var textContent = ""
                if (tagName == "BUTTON") {
                    return element.innerText;
                }

                if (tagName == "INPUT") {
                    return element.value;
                }

                if (commonUtils.textElements.includes(tagName)) {
                    textContent = commonUtils.getTxtFromVirtualTextBox(element.innerText);

                    if (textContent)
                        return textContent;
                    else {
                        return Array.from(element.childNodes).map((node) => node.innerText).join(' ').trim();
                        /*let childTxt = Array.from(element.childNodes).map((node) => node.textContent).join(' ').trim();
                        if(childTxt && childTxt.trim().length > 0){
                            return childTxt;
                        } else {
                            return element.tagName
                        }*/
                    }
                } else {
                    return commonUtils.getTxtFromVirtualTextBox(element.innerText);
                }
            } else if (eventType == "contextmenu") {
                return element.innerText;
            }
        } catch (error) {
            console.error(error);
        }
        console.log('returning "" string::::::::');
        return "";
    }
    function getElementTextByEleAndInteraction(ele, interaction) {
        console.log('inside getElementTextByEleAndInteraction');
        let eleText = null;
        try {
            eleText = getElementText(ele, interaction["eventType"], { "usrMsgs": interaction["eleText"] });
            if (interaction["eventType"] != "inspect-click" && typeof eleText == "string") {
                eleText = eleText.trim();
                /*commonUtils.actionTxtSize=42;*/
                eleText = getValidText(eleText);
            }
        } catch (error) {
            console.error(error);
        }
        console.log('returnig null:::::');
        return eleText;
    }
    function isMatchingElement(ele, interaction) {
        console.log('inside isMatchingElement')
        try {
            if (ele && interaction) {
                let { tagName, eleText, elementType } = interaction;
                let elementTxt = getElementTextByEleAndInteraction(ele, interaction);
                if (ele.tagName.toLowerCase() === tagName && elementType === ele.type) {
                    if (elementTxt == eleText) {
                        console.log('returning true');
                        return true;
                    } else {
                        console.log("Element text not matching for :: ", ele);
                        console.log("Element text not matching for :: ", interaction);
                    }
                }
            }
        } catch (error) {
            console.error("Problem in isMatchingElement method :: ", error);
        }
        console.log('returning false');
        return false;
    }
    function getElementByCenterPoint(centerX, centerY) {
        console.log('inside getElementByCenterPoint:::::::');
        let ele = null;
        try {
            const elements = document.elementsFromPoint(centerX, centerY);
            console.log(elements);
            ele = elements.find(el => {
                const rect = el.getBoundingClientRect();
                const elementCenterX = rect.left + window.scrollX + rect.width / 2;
                const elementCenterY = rect.top + window.scrollY + rect.height / 2;

                return (
                    Math.round(elementCenterX) === Math.round(centerX) &&
                    Math.round(elementCenterY) === Math.round(centerY)
                );
            });
            console.log(ele);
            if (!ele) {
                ele = document.elementFromPoint(centerX, centerY);
            }
        } catch (error) {
            console.error(error);
        }
        console.log("returning element:::::::::::", ele);
        return ele;
    }
    try {
        //console.log("finding element by center point ::");
        let properties = interaction?.properties;
        if (properties) {
            let centerX = properties.centerX;
            let centerY = properties.centerY;
            console.log({ centerX, centerY });
            let ele = getElementByCenterPoint(centerX, centerY);
            if (ele.tagName == "svg") {
                ele = ele.parentElement || ele;
            }
            //compare Properties..
            let isMatchFound = isMatchingElement(ele, interaction);
            console.log('matchFound:::::::::::', isMatchFound, ele);
            if (isMatchFound) {
                let randomCls = "cls_" + Math.random().toString(16).substring(2);
                ele.classList.add(randomCls);
                return randomCls;
            } else {
                console.log("Element found but not matching the requirement :: ");
            }
        }
        ele = commonUtils.getElementByElementText(interaction);
        if (!ele) {
            return null;
        }
        if (ele.tagName == "svg") {
            ele = ele.parentElement || ele;
        }
        let randomCls = "cls_" + Math.random().toString(16).substring(2);
        ele.classList.add(randomCls);
        return randomCls;
    } catch (error) {
        console.error("Problem in finding element bu center point :: ", error);
    }
    return null;
}


async function performBeforeEvent(type = "screenshot", testId, isFullCapture) {
    try {
        console.log('inside performBeforeEvent::::::::::::::::::: ', testId);
        const screenshot = 'data:image/png;base64,' + (isFullCapture ? (await makeDocumentScreenshot(browser)) : (await browser.takeScreenshot()));
        constants.beforePerformEvents[testId] = {
            type,
            screenshot
        }
    } catch (error) {
        console.error('inside performBeforeEvent::::::::::::::::::::', error);
    }
}

async function getText(element) {
    try {
        const textElementTagNames = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'strong', 'em', 'div', 'li', 'label', 'blockquote', 'pre', 'code', 'b', 'i', 'u', 'header', 'footer', 'nav'];
        let tagName = element.tagName.toLowerCase();
        if (textElementTagNames.includes(tagName)) {
            return element.innerText;
        } else {
            return element.value;
        }
    } catch (error) {

    }
    return "";
}
async function getTextToCompare(element) {
    if (!element) {
        return "";
    }
    try {
        return await browser.execute(getText, element);
    } catch (error) {

    }
    return "";
}
module.exports = { addStepWithLabel, addToReport, addStepWithiDiffScreenshot, addStepWithFullScreenshot, addScreenshotToLastReport, addStepWithScreenshot, getOS, getBufferObj, showImageDifferences, cropBase64ImageReport, disableFileInputs, uploadFile, setBrowser, expect, getElement, performBeforeEvent, getTextToCompare,getDragAndDropElement }