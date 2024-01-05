import AllureReporter from '@wdio/allure-reporter'
class DashboardPage{

    get cartBtn(){
        return $("*=Checkout")
    }

   

    get phonesList(){

        return $$("div[class='card h-100'] ")
    }
     



   async getMobileNamesList(reqPhoneArry){
    
        const phonesList=await this.phonesList
        for(let i=0;i<await phonesList.length;i++){
            const phoneName= await phonesList[i].$("div h4 a").getText()
            console.log("Name=="+phoneName)
            if(reqPhoneArry.includes(phoneName)){
                await phonesList[i].$("button").click()
                await   AllureReporter.addStep('Required phone '+phoneName+' is clicked and it is added to cart')
            }
        }

    }

}

export default new DashboardPage();