//import { expect as chaiexpect } from 'chai'

describe('UI components testcases',async()=>{


    it('UI Elements',async()=>{
        await browser.url("https://rahulshettyacademy.com/loginpagePractise")
        await browser.maximizeWindow()
        await $("#username").setValue('rahulshettyacademy')
        await $("input[name='password']").setValue('learning')
        const radioBtns=await $$(".customradio");
        await radioBtns[1].$("span").click()//chaining of locators
        const modalDilog=await $(".modal-body")
        await modalDilog.waitForDisplayed()
        await $("#cancelBtn").click();
        //radio button is selected or not
        console.log(await $$(".customradio")[0].$("span").isSelected())

        await radioBtns[1].$("span").click()
        await modalDilog.waitForDisplayed()
        await $("#okayBtn").click();

        await radioBtns[0].$("span").click()
        await expect(modalDilog).not.toBeDisplayed();


       const dropdown= await $("select.form-control")

       await dropdown.selectByAttribute('value','teach')
       await dropdown.selectByIndex(2)
        await dropdown.selectByVisibleText("Student")

        console.log(await dropdown.getValue())

     //  chaiexpect(await dropdown.getValue()).to.equal('stud')



    })

    it('dynamic dropdown tesstcase',async()=>{
        await browser.url("https://rahulshettyacademy.com/AutomationPractice")
        await browser.maximizeWindow()
        await $("#autocomplete").setValue("ind")
        await browser.pause(3000)
        let list=await $$("[class='ui-menu-item'] div")
        console.log("lenth=="+list.length)
        for(var i=0;i<await list.length;i++){
            console.log("----------------------------$$$$$$$$$$$$$--------***********"+await list[i].getText())
            if( await list[i].getText()=== "India"){
                await list[i].click()
                await browser.pause(8000)
            }
        }

    })


    xit(' checkboxes and screenshot tesstcase',async()=>{
        await browser.url("https://rahulshettyacademy.com/AutomationPractice")
        await browser.maximizeWindow()
       
        let chkList=await $$("input[type='checkbox']")
        console.log("lenth=="+chkList.length)
            
        for(var i=0;i<await chkList.length;i++){
            console.log("-------$$$$$$$$$$$$$--------***********"+await chkList[i].getAttribute("value"))
            if( await chkList[i].getAttribute("value")=== "option2"){
                await chkList[i].click()
                await browser.saveScreenshot("chkbox.png")
            }
        }

    })


    xit(' checkboxes and screenshot tesstcase',async()=>{
        await browser.url("https://www.redbus.in/")
        await browser.maximizeWindow()
       
        let source=await $("#src")
        await source.setValue("hyderabad")
        await browser.pause(2000)
        let reqSource=await $("div[id='homeV2-root'] li:nth-child(4)")
       await  reqSource.click()

        let destination=await $("#dest")
        destination.setValue("vijayawada")
        await browser.pause(2000)
        let reqDest=await $("div[id='homeV2-root'] li:nth-child(5)")
        reqDest.click(); 
        await browser.pause(8000)
        await $(".DayTiles__CalendarDaysSpan-sc-1xum02u-1.bwoYtA").click()
        await browser.pause(8000)
        await $("#search_button").click();
        await browser.pause(8000)
    })


})