import path from 'path';

describe('Window and tab handling testcases',async()=>{

    xit('Window Handling TC',async()=>{

        await browser.url("https://rahulshettyacademy.com/loginpagePractise/")
        await $(".blinkingText").click()
        console.log(await browser.getTitle());
        const windowsList=await browser.getWindowHandles()
       await browser.switchToWindow(windowsList[1])
       console.log(await browser.getTitle())
        await $(".red").waitForDisplayed()
       console.log("***************************"+await $(".red").getText())
      await browser.closeWindow()
      browser.switchToWindow(windowsList[0])
      console.log(await browser.getTitle())

      await browser.newWindow("https://www.incometax.gov.in/iec/foportal/")
      console.log(await browser.getTitle())
      browser.switchWindow("https://rahulshettyacademy.com/loginpagePractise/")
      console.log(await browser.getTitle())
      await $("#username").setValue("BackToold window")
     await browser.pause(3000)





    })

    xit('Frames Handling TC',async()=>{
       await  browser.url("https://rahulshettyacademy.com/AutomationPractice/")
       const beforFrameSwitchLinksCount= await $$("a").length
       console.log("brfore=="+beforFrameSwitchLinksCount)
      await browser.switchToFrame(await $('#courses-iframe'))
       const afterFrameSwitchLinksCount=await $$("a").length
       console.log("after=="+afterFrameSwitchLinksCount)
       await browser.switchToFrame(null)

    })


    xit('upload TC',async()=>{
       await browser.url("https://rahulshettyacademy.com/howto/howto_html_file_upload_button.asp")
       await $('#myFile').waitForExist()
       const filePath = 'C:\\Users\\Administrator\\Downloads\\PreFillSchema_V7.8_DummyData_V23.json'
       const remoteFilePath = await browser.uploadFile(filePath)
      
       await $('#myFile').setValue(remoteFilePath)
      // await $('#file-submit').click()
      
        await browser.pause(3000)

    })


    it('upload TC angular',async()=>{
        await browser.url("http://125.16.30.184:9000/")
      // await $('#uploadPre input').waitForDisplayed()
         const fileInput = await $('#uploadPre input');
        const filePath = 'C:/Users/Administrator/Downloads/PreFillSchema_V7.8_DummyData_V23.json'
        
        const currentDirectory = process.cwd();

        const filePath1 = path.join(currentDirectory, filePath)
        
        await fileInput.waitForExist()
        await fileInput.setValue(filePath1);
       // await $('#file-submit').click()
       
         await browser.pause(3000)
 
     })

     xit('upload TC angularsdfsf',async()=>{
        await browser.url("http://125.16.30.184:9000/")
      
  // Locate the file input element
  const fileInput = await $('#uploadPre input');

  const currentDirectory = process.cwd();
  // Get the absolute path to the file you want to upload
  const filePath = path.join(currentDirectory, 'C:/Users/Administrator/Downloads/PreFillSchema_V7.8_DummyData_V23.json');

  // Click the file input element to focus it
  await fileInput.click();

  // Use Java Robot Class to simulate keyboard interactions
  const robot = new java.awt.Robot();
  robot.setAutoDelay(1000);

  // Simulate typing the file path and pressing Enter
  filePath.split('').forEach((char) => {
    robot.keyPress(java.awt.event.KeyEvent.VK_SHIFT);
    robot.keyPress(char.charCodeAt(0));
    robot.keyRelease(char.charCodeAt(0));
    robot.keyRelease(java.awt.event.KeyEvent.VK_SHIFT);
  });

  robot.keyPress(java.awt.event.KeyEvent.VK_ENTER);
  robot.keyRelease(java.awt.event.KeyEvent.VK_ENTER);


       
         await browser.pause(3000)
 
     })


})