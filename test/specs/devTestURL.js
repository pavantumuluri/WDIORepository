describe("My TestCase", async () => {
    it("reasyapps/app/Indus_meta_sai_1/login", async () => {
        await browser.url('http://172.16.0.237:3000/reasyapps/app/Indus_meta_sai_1');
      // await browser.pause(5000)
        const ele1=  await $("//div[@id='mask' and contains(@style,'display: block;')]");
       // await ele1.waitForExist({reverse:true})

        await $('[myid="reasy_screen_login__LOGIN_LAYOUT_inputTextbox_4_1"]').setValue('admin');
        await $('[myid="reasy_screen_login__LOGIN_LAYOUT_inputTextbox_4_1"]').waitfor
        await $('[myid="reasy_screen_login__LOGIN_LAYOUT_InputPassword_6_2"]').setValue('admin1');
        await $('[myid="reasy_screen_login__LOGIN_LAYOUT_login_9_1"]').click();
        console.log('first page');
      //  await ele1.waitForExist({reverse:true})
        // });
        // it("reasyapps/app/Indus_meta_sai_1/screen11_HEADER_FOOTER", async () => {
        // await browser.url('http://172.16.0.237:3000/reasyapps/app/Indus_meta_sai_1');
       // await browser.pause(5000);
        // let ele = await $('[moduleid="1671687690062"]');
       // browser.executeAsync("document.querySelector('[moduleid=\"1671687690062\"]').click()");
        // let isClickable = await ele.isClickable();
        // console.log("isClickable :::: ", isClickable);
        // await ele.click();
        await $("=Branch").waitforValue();
        await $("=Branch").click()
        var createlink=await $("=Create")
        createlink.waitForDisplayed();
       await createlink.click()
        console.log('menu click');
        await ele1.waitForExist({reverse:true})
        // });
        // it("reasyapps/app/Indus_meta_sai_1/screen02_IndusInd_portal_NXT", async () => {
        // await browser.url('http://172.16.0.237:3000/reasyapps/app/Indus_meta_sai_1');
        // await browser.pause(5000);
        const ele = await browser.$('[myid="screen02_IndusInd_portal_NXT_inputTextbox_999276_2"]')
        await ele.waitForDisplayed();
        await ele.setValue("BBBb")

        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_999276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_1799276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_3899276_2"]').setValue('BBBranchh123');
       await $('#screen02_IndusInd_portal_NXT_inputTextbox_3599276_id_2').setValue('123')
       // await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_3599276_2"]').setValue('123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_3299276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_2999276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_2399276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_2099276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_2699276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_4399276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_5299276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_4999276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_inputTextbox_4699276_2"]').setValue('BBBranchh123');
        await $('[myid="screen02_IndusInd_portal_NXT_submit_5499276_1"]').click();
        console.log('create page')
        // });
        // it("reasyapps/app/Indus_meta_sai_1/screen06_IndusInd_portal_NXT", async () => {
        // await browser.url('http://172.16.0.237:3000/reasyapps/app/Indus_meta_sai_1');
        // await browser.pause(5000);
        await $('[myid="screen06_IndusInd_portal_NXT_inputTextbox_2041532_2"]').setValue('BBBranchh123');
        await $('[myid="screen06_IndusInd_portal_NXT_submit_2141532_1"]').click();
        await $('[myid="HEADER_FOOTER_Header_1layout42307_10"]').click();
    });
})