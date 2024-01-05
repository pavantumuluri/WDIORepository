import { expect as expectchai } from 'chai'
describe('Mouse Hover components testcases',async()=>{
   
    xit(' Mouse Hover',async()=>{
        await browser.url("https://rahulshettyacademy.com/AutomationPractice")
       // await browser.maximizeWindow()
        await $("#mousehover").scrollIntoView()
        await browser.pause(3000)
        await browser.saveScreenshot("mouseHover.png")
        const selector=await $("#mousehover")
        await selector.moveTo()
        await browser.pause(3000)
        await $("=top").click()
        await browser.pause(3000)

    })
   
    xit('Handling alerts',async()=>{
        await browser.url("http://only-testing-blog.blogspot.com/2014/09")
        await browser.maximizeWindow()
        await $("button").doubleClick()
        await browser.waitUntil(isAlertOpen())
        console.log( await browser.isAlertOpen())
        expectchai(await browser.isAlertOpen()).to.be.true
       expectchai(await browser.getAlertText()).to.equal("You double clicked me.. Thank You..")
       await  browser.acceptAlert()
       await browser.pause(3000)
    })

    xit('Sorting items',async()=>{
       await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/offers")
       await $("tr th:nth-child(1)").click()
        const listFoItems=await $$("tr td:nth-child(1)")
        const vagiNamesList=listFoItems.map(async eachItem=>await eachItem.getText())
        console.log("-----="+vagiNamesList)
        
        const vegiNameAfterSort=vagiNamesList.sort()
        await expectchai(vegiNameAfterSort).to.be.equal(vagiNamesList)


    })


    xit('Web tables filter validation',async()=>{
        await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/offers")
        await $("#search-field").setValue("tomato")   
         const vegginames=await $$("tr td:nth-child(1)")
         expect(vegginames).toBeElementsArrayOfSize({eq:1})
         console.log("-----="+await vegginames[0].getText())
         expect(vegginames[0]).toHaveTextContaining("Tomato")
         
 
     })

    it('React Application',async()=>{
        await browser.url("https://www.saucedemo.com/")
        await $("#user-name").setValue("standard_user")
        await $("#password").setValue("secret_sauce")
        await $("#login-button").click()
        const cart=await $("#shopping_cart_container")
        await cart.waitForDisplayed()
       await cart.click()
       const chkout=await $("#checkout")
       await chkout.waitForDisplayed()
       await chkout.click()
       const fname=await $("#first-name")
        await fname.waitForDisplayed()
        fname.setValue("abc")
        await $("#last-name").setValue("asdf")
        await $("#postal-code").setValue("523654")
        await $("#continue").click()
        await $("#finish").waitForDisplayed()
        await $("#finish").click()
        await browser.pause(3000)

    })


})