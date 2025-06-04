import LoginPage from '../pageobjects/RALoginPage.js'
import DashboardPage from '../pageobjects/RLDashbordPage.js'
import ItemSummeryPage from '../pageobjects/RACartSummeryPage.js'
import CheckoutPage from '../pageobjects/RACheckOutPage.js'
import utilityPage from '../pageobjects/UtilityPage.js'
import { expect as chaiexpect } from 'chai'
import * as fs from 'fs'
import { addStepWithScreenshot } from '../pageobjects/allureUtils.js'
import AllureReporter from '@wdio/allure-reporter'
import path from 'path';

let credentials=JSON.parse(fs.readFileSync('test/testdata/LoginPage.json'))
let mobileNamesFromJson=JSON.parse(fs.readFileSync('test/testdata/DashBordpage.json'))


describe('cart e2e flow testcases',async()=>{
    credentials.forEach(  ({username,password})  =>{
    it('login and items purchase TC-1',async()=>{

        await browser.url("https://rahulshettyacademy.com/loginpagePractise")
        await browser.maximizeWindow()
        await LoginPage.Login(username,password)
        await browser.waitUntil(async()=> await LoginPage.signInBtn.getAttribute("value")=== 'Sign In',
        {
            timeout:9000,
            timeoutMag:'eroor msg is not displayed'
        })
       await console.log("===============================================")
       await console.log(await LoginPage.alert.getText())
       await console.log("===============================================")

       await expect(LoginPage.info).toHaveTextContaining("username is rahulshettyacademy and Password is learning")

    })
})


mobileNamesFromJson.forEach(({moblieNamesList})  =>{
    it('login and items purchase TC smoke --2',async()=>{
       AllureReporter.addOwner('Pavan Kumar T')
       AllureReporter.addFeature('Add mobiles to cart and purchages form cart and delivered to specified address')
        await browser.url("https://rahulshettyacademy.com/loginpagePractise")
        await browser.maximizeWindow()
      utilityPage.takeScreenShot('URl is navigated successfully and maximised')
       AllureReporter.addSeverity('critical')
       
    // await   addStepWithScreenshot('Url is navegated successfully')
     // await utilityPage.takeScreenShot('Url is navegated successfully');
     await   LoginPage.Login("rahulshettyacademy","learning")
     utilityPage.takeScreenShot("User name and password is enterd successfully")
     
    // await   addStepWithScreenshot("Username and passwords are entered")
    //await utilityPage.takeScreenShot("Username and passwords are entered");
    
        await DashboardPage.cartBtn.waitForExist()

//const reqPhoneArry=[moblieNamesList]
await utilityPage.takeScreenShot("dashborad page is displayed");
        const phonesList=await DashboardPage.phonesList
        await DashboardPage.getMobileNamesList(moblieNamesList)
        await utilityPage.takeScreenShot("Mobiles are added to cart");
        await DashboardPage.cartBtn.click()
        await utilityPage.takeScreenShot("Cart button is clicked ");
        
        await browser.pause(3000)
        const sumOfItems=await ItemSummeryPage.totalCalcution()
         console.log("total=="+await ItemSummeryPage.totalCalcution())
         console.log(ItemSummeryPage.test())
       const  totalValFromUI=parseInt((await ItemSummeryPage.totalFromUI.getText()).split(".")[1].trim())
        console.log("totalValFromUI=="+totalValFromUI)
        await utilityPage.takeScreenShot("Toal value from UI="+totalValFromUI);
       
        await chaiexpect(totalValFromUI).to.equal(sumOfItems)
       await utilityPage.takeScreenShot("Sum of items value is matched with calculated value")
        
        await ItemSummeryPage.proceedBtn.click()
       await utilityPage.takeScreenShot("Proceed button is clicked")
        const country=await CheckoutPage.countyTxtBox.setValue("ind")
       await utilityPage.takeScreenShot("'ind' value is entered")
        await CheckoutPage.loadingDots.waitForExist({reverse:true})
        await CheckoutPage.indiaLink.click()
        await  utilityPage.takeScreenShot("INDIA is selected form list")
        
        await CheckoutPage.submit.click()
        await utilityPage.takeScreenShot("Submit button is clicked")
       await expect(CheckoutPage.successMsg).toHaveTextContaining("Success!")
       



    })
})


it('step with screenshot Tc-3',async()=>{
  try {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise")
  await browser.maximizeWindow()
  await   utilityPage.takeScreenShot('Url is navegated successfully')
  await   LoginPage.Login("rahulshettyacademy","learning")
  await   utilityPage.takeScreenShot("Username and passwords are entered")
  } catch (error) {
    console.error("Error saving screenshot:", error);
  }
       
  
})



})