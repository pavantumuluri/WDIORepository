import { expect as chaiexpect } from 'chai'
describe('cart e2e flow testcases',async()=>{

    it('login and items purchase TC smoke',async()=>{

        await browser.url("https://rahulshettyacademy.com/loginpagePractise")
        await browser.maximizeWindow()
        await $("#username").setValue('rahulshettyacademy')
        await $("input[name='password']").setValue('learning')
        await $("#signInBtn").click()

        await $("*=Checkout").waitForExist()

        const reqPhoneArry=["Nokia Edge","Blackberry"]
        const phonesList=await $$("div[class='card h-100'] ")
        for(let i=0;i<await phonesList.length;i++){
            const phoneName= await phonesList[i].$("div h4 a").getText()
            console.log("Name=="+phoneName)
            if(reqPhoneArry.includes(phoneName)){
                await phonesList[i].$("button").click()
            }
        }
        await $("*=Checkout").click()
        await browser.pause(3000)

        const itemsCostList=$$("tr td:nth-child(4) strong")
       
const sumOfItems=(await Promise.all(await itemsCostList.map(async (eachItemCost) =>
 parseInt((await eachItemCost.getText()).split(".")[1].trim() ))))
        .reduce((acc,price)=>acc+price,0)
    
        console.log("total=="+sumOfItems)


       const  totalValFromUI=parseInt((await $("h3 strong").getText()).split(".")[1].trim())

       
        await chaiexpect(totalValFromUI).to.equal(sumOfItems)
        await $(".btn-success").click()
        const country=await $("#country").setValue("ind")
        await $(".lds-ellipsis").waitForExist({reverse:true})
        await $("=India").click()
        await $("input[type='submit']").click()
       await expect($(".alert-success")).toHaveTextContaining("Success!")



    })


})