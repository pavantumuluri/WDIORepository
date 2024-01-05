describe('Firs test suite',async()=>{

    xit('First test case ', async()=> {
   
        await browser.url("/loginpagePractise")
       await  console.log("title=="+await browser.getTitle())
       await  expect(browser).toHaveTitleContaining('Rahul Shetty Academy')
        await $("#username").setValue('pavan');
        await $("input[name='password']").setValue('pavan123')
        await $("input[value='admin']").click()
       // await $("#terms").click()
       await  browser.pause(3000)
        await $("#signInBtn").click()
        await browser.waitUntil(async()=> await $("#signInBtn").getAttribute("value")=== 'Sign In',
        {
            timeout:9000,
            timeoutMag:'eroor msg is not displayed'
        })
       await console.log("===============================================")
       await console.log(await $(".alert-danger").getText())
       await console.log("===============================================")

       await expect($('p')).toHaveTextContaining("username is rahulshettyacademy and Password is learning12")

    })

    it('Login testcase smoke',async()=>{
        await browser.url("/loginpagePractise")
        await browser.maximizeWindow()
        await $("#username").setValue('rahulshettyacademy1')
        await $("input[name='password']").setValue('learning')
        await $("#signInBtn").click()

        //wait until dashbord loading
        await $(".btn-primary").waitForExist()
        //to check the title and url
        await expect(browser).toHaveUrlContaining("shop")
        await expect(browser).toHaveTitle("ProtoCommerce")

    })


})