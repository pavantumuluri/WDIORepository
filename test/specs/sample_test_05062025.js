//const chaiexpect = require('chai').expect;

import { addStepWithScreenshot, addScreenshotToLastReport, addStepWithFullScreenshot, addStepWithiDiffScreenshot, addToReport, addStepWithLabel, getOS, disableFileInputs, uploadFile, getElement, performBeforeEvent, expect, getTextToCompare, getDragAndDropElement } from '../utility/helper.js';
import report from '../utility/report.js';
import data from '../testdata/data.js';
import uploadedFiles from '../testdata/uploadedFiles.js';
import constants from '../utility/constants.js';
import fs from 'fs';

describe("tb754_tbpractice_05062025", async ()=>{
	let url='https://testbook.ai/testbookpractice',initTime, endTime;
	before(async () => {
		await browser.url(url);
		try{
			await browser.maximizeWindow();
		}catch(e){console.error(e);}
		addStepWithLabel('navigation to "' + url + '" is successful');
	})
	it("testbookpractice/Testbook_Automation_Pratice0", async()=>{
		let element, elementValue, timer, uploadedFile;
		await browser.pause(3000);
		await browser.execute(disableFileInputs);
		try{
					element = await getElement('mbj95k3ixr7kk0bp04c');
			elementValue=data['mbj95k3ixr7kk0bp04c'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Username:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Username:"','failed')
		}
		try{
		await browser.pause(4001);
					element = await getElement('mbj95o10vehjuwvxm3');
			elementValue=data['mbj95o10vehjuwvxm3'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Password:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Password:"','failed')
		}
		try{
		await browser.pause(1001);
					element = await getElement('mbj95p5x3r64ub9el98');
			elementValue=data['mbj95p5x3r64ub9el98'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Phone Number:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Phone Number:"','failed')
		}
		try{
		await browser.pause(1998);
					element = await getElement('mbj95qgl093ob14ti0nj');
			elementValue=data['mbj95qgl093ob14ti0nj'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Date of Birth:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Date of Birth:"','failed')
		}
		try{
		await browser.pause(3991);
					element = await getElement('mbj95u27zwdes2wh65o');
			elementValue=data['mbj95u27zwdes2wh65o'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Bio:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Bio:"','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj95u5lomlbhq1856');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Male" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Male" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj95up4zgvusmcrnrd');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Reading" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Reading" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj95vg6yeg0fvm3c2s');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Cooking" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Cooking" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1906);
					element = await getElement('mbj95ww2qwe5szle8j');
			
try{				
await element?.selectByAttribute('value', 'usa');
				}catch(err){
				await element.selectByVisibleText('usa');
				} 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Country:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Country:"','failed')
		}
		try{
		await browser.pause(1095);
					element = await getElement('mbj95xrla6r3h9rpr2');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Proficiency" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Proficiency" has clicked successfully.','failed')
		}
		try{
		await browser.pause(2899);
					element = await getElement('mbj960ko07r32ypw1pqt');
			
try{				
await element?.selectByAttribute('value', 'intermediate');
				}catch(err){
				await element.selectByVisibleText('intermediate');
				} 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Skills"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Skills"','failed')
		}
		try{
			timer = Date.now();
			const srcSelectors = [["myid",null],["id",null],["i18nkey",null],["moduleid",null],["relativeXpath","//parent::TD/SELECT[text()=\"BeginnerIntermediateAdvanced\"]"],["relativeXpath2","//*[@name='html_skill']"],["attributes","[name=\"html_skill\"]"],["xpath","/html[1]/body[1]/main[1]/div[1]/div[1]/div[1]/div[1]/form[1]/div[9]/table[1]/tbody[1]/tr[1]/td[2]/select[1]"]];
			const destSelectors = [["myid",null],["id",null],["i18nkey",null],["moduleid",null],["relativeXpath","//parent::TD/SELECT[text()=\"BeginnerIntermediateAdvanced\"]"],["relativeXpath2","//*[@name='html_skill']"],["attributes","[name=\"html_skill\"][data-gtm-form-interact-field-id=\"9\"]"],["xpath","/html[1]/body[1]/main[1]/div[1]/div[1]/div[1]/div[1]/form[1]/div[9]/table[1]/tbody[1]/tr[1]/td[2]/select[1]"]];
			const elem = await getDragAndDropElement(srcSelectors);
			const target = await getDragAndDropElement(destSelectors);
			const sourceLocationBefore = await elem.getLocation();
			const targetLocationBefore = await target.getLocation();
			await elem.dragAndDrop(target);
			const sourceLocationAfter = await elem.getLocation();
			const targetLocationAfter = await target.getLocation();
			const isDropSuccessful = sourceLocationBefore.x !== sourceLocationAfter.x && sourceLocationBefore.y !== sourceLocationAfter.y && targetLocationBefore.x !== targetLocationAfter.x && targetLocationBefore.y !== targetLocationAfter.y;
			addStepWithLabel("Able to drag and drop", isDropSuccessful)
		}catch(e){
			addStepWithLabel('unable to drag source onto destination','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj961kd7uuaqn75ty');
			
try{				
await element?.selectByAttribute('value', 'advanced');
				}catch(err){
				await element.selectByVisibleText('advanced');
				} 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Skills"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Skills"','failed')
		}
		try{
		await browser.pause(3000);
					element = await getElement('mbj964azt5nac5nnzoj');
			
try{				
await element?.selectByAttribute('value', 'intermediate');
				}catch(err){
				await element.selectByVisibleText('intermediate');
				} 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Skills"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Skills"','failed')
		}
		try{
		await browser.pause(2100);
					element = await getElement('mbj966bg6fus8hbydso');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "division" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "division" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj9673npq9frh4elcn');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "division" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "division" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj967noy2ui4h1mj6e');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "division" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "division" has clicked successfully.','failed')
		}
		try{
		await browser.pause(3910);
					element = await getElement('mbj96b7l0458r45hl52l');
			await expect(data['mbj96b7l0458r45hl52l'], await getTextToCompare(element))

			await browser.pause(1000);
			addStepWithLabel('value matches for "Verify \'Use this label to test \'verify text\'"');

		}catch(e){
			addStepWithLabel('value matches for "Verify \'Use this label to test \'verify text\'"','failed')
		}
		try{
		await browser.pause(6092);
					element = await getElement('mbj96h23oyhes9nvmi');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Sign Up Now" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Sign Up Now" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1899);
					element=null;
			let alertTxt = await browser.getAlertText();
			await browser.pause(1000);
			await browser.acceptAlert();

			await browser.pause(1000);
			addStepWithLabel('Clicked on Sign Up Now! message was verified');

		}catch(e){
			addStepWithLabel('Clicked on Sign Up Now! message was verified','failed')
		}
		try{
		await browser.pause(1002);
					element = await getElement('mbj96j9rcpdaeutauxr');
			await element?.doubleClick(); 

			await browser.pause(1000);
			addStepWithLabel('element "Toggle Text" has double clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Toggle Text" has double clicked successfully.','failed')
		}
		try{
		await browser.pause(2997);
					element = await getElement('mbj96m522ezwaen2xpr');
			await expect(data['mbj96m522ezwaen2xpr'], await getTextToCompare(element))

			await browser.pause(1000);
			addStepWithLabel('value matches for "Verify \'I 💖 Testbook.ai\' text"');

		}catch(e){
			addStepWithLabel('value matches for "Verify \'I 💖 Testbook.ai\' text"','failed')
		}
		try{
			timer = Date.now();
			const srcSelectors = [["myid",null],["id","dbclick-btn"],["i18nkey",null],["moduleid",null],["relativeXpath","//parent::*[contains(@class, \"widget-content\")]/BUTTON[text()=\"Toggle Text\"]"],["relativeXpath2","//*[@id='dbclick-btn']"],["attributes","[type=\"button\"][ondblclick=\"doubeClick()\"]"],["xpath","/html[1]/body[1]/main[1]/div[1]/div[1]/div[1]/div[1]/form[1]/div[12]/button[1]"]];
			const destSelectors = [["myid",null],["id","toggleButton"],["i18nkey",null],["moduleid",null],["relativeXpath","//parent::*[contains(@class, \"widget-content\")]/BUTTON[text()=\"Follow\"]"],["relativeXpath2","//*[@id='toggleButton']"],["attributes","[type=\"button\"][onclick=\"toggleFollow(this)\"]"],["xpath","/html[1]/body[1]/main[1]/div[1]/div[1]/div[1]/div[1]/form[1]/div[13]/button[1]"]];
			const elem = await getDragAndDropElement(srcSelectors);
			const target = await getDragAndDropElement(destSelectors);
			const sourceLocationBefore = await elem.getLocation();
			const targetLocationBefore = await target.getLocation();
			await elem.dragAndDrop(target);
			const sourceLocationAfter = await elem.getLocation();
			const targetLocationAfter = await target.getLocation();
			const isDropSuccessful = sourceLocationBefore.x !== sourceLocationAfter.x && sourceLocationBefore.y !== sourceLocationAfter.y && targetLocationBefore.x !== targetLocationAfter.x && targetLocationBefore.y !== targetLocationAfter.y;
			addStepWithLabel("Able to drag and drop", isDropSuccessful)
		}catch(e){
			addStepWithLabel('unable to drag source onto destination','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj96mzhmjj986ohhbj');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Follow" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Follow" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1004);
					element = await getElement('mbj96npey0zaodyx72h');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Submit" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Submit" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1005);
					element = await getElement('mbj96ohrdqu7cvzuci');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Login" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Login" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj96pb16yel3hz8n6j');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Add to Cart" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Add to Cart" has clicked successfully.','failed')
		}
		try{
		await browser.pause(6994);
					element = await getElement('mbj96v0z930h5dmwujn');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Validate Captcha" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Validate Captcha" has clicked successfully.','failed')
		}
		try{
		await browser.pause(6900);
					element = await getElement('mbj971q1qlmhati557s');
			elementValue=data['mbj971q1qlmhati557s'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Email:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Email:"','failed')
		}
		try{
		await browser.pause(3001);
					element = await getElement('mbj974b4b7gfukht07k');
			uploadedFile=uploadedFiles['mbj974b4b7gfukht07k'];
			await browser.execute(uploadFile, uploadedFile['data'],uploadedFile['fileName'] , element); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the file uploaded successfully for "Upload an image:"');

		}catch(e){
			addStepWithLabel('the file uploaded successfully for "Upload an image:"','failed')
		}
		try{
		await browser.pause(1099);
					element = await getElement('mbj975t3uzs2b3wftf');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Download Image" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Download Image" has clicked successfully.','failed')
		}
	})
	it("Testbookframe/Practice_Form1", async()=>{
		let element, elementValue, timer, uploadedFile;
		await browser.switchToFrame(0);
		await browser.execute(disableFileInputs);
		try{
		await browser.pause(3900);
					element = await getElement('mbj97a80irnh46hukl');
			elementValue=data['mbj97a80irnh46hukl'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "User Name:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "User Name:"','failed')
		}
		try{
		await browser.pause(1100);
					element = await getElement('mbj97app9sfqr2ex6hk');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Male" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Male" has clicked successfully.','failed')
		}
		try{
		await browser.pause(7000);
					element = await getElement('mbj97hcuw3uqau7xnmi');
			elementValue=data['mbj97hcuw3uqau7xnmi'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "User DOB"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "User DOB"','failed')
		}
		try{
		await browser.pause(1996);
					element = await getElement('mbj97j17n0aezvjlvy');
			
try{				
await element?.selectByAttribute('value', 'Radio-0');
				}catch(err){
				await element.selectByVisibleText('Radio-0');
				} 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "User Job:"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "User Job:"','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj97jks081d9iyxaezf');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Submit" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Submit" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1901);
					element=null;
			let alertTxt = await browser.getAlertText();
			await browser.pause(1000);
			await browser.acceptAlert();

			await browser.pause(1000);
			addStepWithLabel('Signed Up successfully in iframe.! message was verified');

		}catch(e){
			addStepWithLabel('Signed Up successfully in iframe.! message was verified','failed')
		}
		await browser.switchToParentFrame();
	})
	it("testbookpractice/Testbook_Automation_Pratice2", async()=>{
		let element, elementValue, timer, uploadedFile;
		await browser.execute(disableFileInputs);
		try{
		await browser.pause(1098);
					element = await getElement('mbj97n3ucxg634d3nqu');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Drag me to below \'Drop here\' section" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Drag me to below \'Drop here\' section" has clicked successfully.','failed')
		}
		try{
			timer = Date.now();
			const srcSelectors = [["myid",null],["id",null],["i18nkey",null],["moduleid",null],["relativeXpath","//parent::*[@id=\"drag1\"]/P"],["relativeXpath2","//*[@id='drag1']/p[1]"],["attributes",null],["xpath","/html[1]/body[1]/main[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/p[1]"]];
			const destSelectors = [["myid",null],["id","droppable"],["i18nkey",null],["moduleid",null],["relativeXpath","//parent::*[contains(@class, \"widget-content\")]/DIV[2][text()=\"Drop here\"]"],["relativeXpath2","//*[@id='droppable']"],["attributes","[ondrop=\"drop(event);\"][ondragover=\"allowDrop(event);\"]"],["xpath","/html[1]/body[1]/main[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]"]];
			const elem = await getDragAndDropElement(srcSelectors);
			const target = await getDragAndDropElement(destSelectors);
			const sourceLocationBefore = await elem.getLocation();
			const targetLocationBefore = await target.getLocation();
			await elem.dragAndDrop(target);
			const sourceLocationAfter = await elem.getLocation();
			const targetLocationAfter = await target.getLocation();
			const isDropSuccessful = sourceLocationBefore.x !== sourceLocationAfter.x && sourceLocationBefore.y !== sourceLocationAfter.y && targetLocationBefore.x !== targetLocationAfter.x && targetLocationBefore.y !== targetLocationAfter.y;
			addStepWithLabel("Able to drag and drop", isDropSuccessful)
		}catch(e){
			addStepWithLabel('unable to drag source onto destination','failed')
		}
		try{
		await browser.pause(2110);
					element = await getElement('mbj97sseq7qofdk604');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Mobiles" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Mobiles" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1890);
					element=null;
			let alertTxt = await browser.getAlertText();
			await browser.pause(1000);
			await browser.acceptAlert();

			await browser.pause(1000);
			addStepWithLabel('clicked on \'Mobiles\' message was verified');

		}catch(e){
			addStepWithLabel('clicked on \'Mobiles\' message was verified','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj97u7z0jm83r5dct1k');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Right click on Me" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Right click on Me" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj97ub6io2glpeky0c');
			await element?.click({ button: 'right' }); 

			await browser.pause(1000);
			addStepWithLabel('element "Right click on Me" has right clicked successfull.');

		}catch(e){
			addStepWithLabel('element "Right click on Me" has right clicked successfull.','failed')
		}
		try{
		await browser.pause(1101);
					element = await getElement('mbj97uxgs45uiyme2t');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Play" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Play" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element=null;
			let alertTxt = await browser.getAlertText();
			await browser.pause(1000);
			await browser.acceptAlert();

			await browser.pause(1000);
			addStepWithLabel('Clicked on Play ! message was verified');

		}catch(e){
			addStepWithLabel('Clicked on Play ! message was verified','failed')
		}
		try{
		await browser.pause(1994);
					element = await getElement('mbj97xkzo3gqaqx6nf');

			await browser.pause(1000);
			addStepWithLabel('undefined');

		}catch(e){
			addStepWithLabel('addStepWithLabel("undefined");','failed');
			
		}
		try{
		await browser.pause(1109);
					element = await getElement('mbj97zs6x2tyjrn2i9f');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Pop Up" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Pop Up" has clicked successfully.','failed')
		}
		try{
		await browser.pause(2000);
					element = await getElement('mbj981plb77zdr3djht');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Solutions" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Solutions" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj982l1chnego4ial7');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Small Business" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Small Business" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element=null;
			let alertTxt = await browser.getAlertText();
			await browser.pause(1000);
			await browser.acceptAlert();

			await browser.pause(1000);
			addStepWithLabel('Clicked on "Small Business" menu. message was verified');

		}catch(e){
			addStepWithLabel('Clicked on "Small Business" menu. message was verified','failed')
		}
		try{
		await browser.pause(1104);
					element = await getElement('mbj984mbuayqy8e7nva');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Close" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Close" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1996);
					element = await getElement('mbj9862a0bcv0te03yy8');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "New Browser Tab" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "New Browser Tab" has clicked successfully.','failed')
		}
	})
	it("feedback/Help_Shape_the_Future_of_Testbook.ai3", async()=>{
		let element, elementValue, timer, uploadedFile;
		handles = await browser.getWindowHandles();
		await browser.switchToWindow(handles[1]);
		await browser.execute(disableFileInputs);
		try{
		await browser.pause(7000);
					element = await getElement('mbj98f5jrncd1dy568b');
			elementValue=data['mbj98f5jrncd1dy568b'];
			await browser.execute((ele) => {ele.focus();},element);
			await element?.setValue(elementValue); 
			//await browser.keys(tab);

			await browser.pause(1000);
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Email address (Optional)"');

		}catch(e){
			addStepWithLabel('the value "'+elementValue+'" has successfully set on "Email address (Optional)"','failed')
		}
		try{
		await browser.pause(1097);
					element = await getElement('mbj98f8ricy2gilxtx');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Excellent" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Excellent" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element = await getElement('mbj98fu0clespr0ec0g');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Submit" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Submit" has clicked successfully.','failed')
		}
		await browser.closeWindow();
		await browser.switchToWindow(handles[0]);
	})
	it("testbookpractice/Testbook_Automation_Pratice4", async()=>{
		let element, elementValue, timer, uploadedFile;
		await browser.execute(disableFileInputs);
		try{
		await browser.pause(4170);
					element = await getElement('mbj98jhmicjxtkz2m3e');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Alert" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Alert" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element=null;
			let alertTxt = await browser.getAlertText();
			await browser.pause(1000);
			await browser.acceptAlert();

			await browser.pause(1000);
			addStepWithLabel('Hello world ! message was verified');

		}catch(e){
			addStepWithLabel('Hello world ! message was verified','failed')
		}
		try{
		await browser.pause(1100);
					element = await getElement('mbj98l8wi7623mhf6xl');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Confirm Box" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Confirm Box" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1000);
					element=null;
			let confirmVal = true;
			let alertTxt = await browser.getAlertText();
			await browser.pause(1000);
			if(confirmVal){
				await browser.acceptAlert();
}else{
			await browser.dismissAlert();
}

			await browser.pause(1000);
			addStepWithLabel('Hello, I\'m Confirm alert? message was verified');

		}catch(e){
			addStepWithLabel('Hello, I\'m Confirm alert? message was verified','failed')
		}
		try{
		await browser.pause(1092);
					element = await getElement('mbj98n2a2s8hhqy1cpt');
			await element?.click(); 

			await browser.pause(1000);
			addStepWithLabel('element "Prompt" has clicked successfully.');

		}catch(e){
			addStepWithLabel('element "Prompt" has clicked successfully.','failed')
		}
		try{
		await browser.pause(1901);
					element=null;
			let alertTxt = await browser.getAlertText();
			browser.sendAlertText(data['mbj98pc1btyosw88exk']);
			await browser.pause(1000);
			await browser.acceptAlert();

			await browser.pause(1000);
			addStepWithLabel('Please enter your name: message was verified');

		}catch(e){
			addStepWithLabel('Please enter your name: message was verified','failed')
		}
	})
	after(() => {
		endTime = Date.now();
		let res = [{
			startTime: initTime,
			endTime,
			testUrl: url,
			reportDetails: report.getReport(),
			finalStatus: constants.finalStatus,
			os: getOS(),
			browserName: browser.capabilities.browserName,
			browserVersion: browser.capabilities.browserVersion || browser.capabilities.version,
			sessionId: browser.sessionId
		}]
		console.log("Final Report Node :: "+JSON.stringify(res)+" :: End");
	})
})
	process.on('SIGINT', () => {
		console.log('termination signal received. Aborting test execution.');
		process.exit(1);
		browser.closeWindow();
	})
