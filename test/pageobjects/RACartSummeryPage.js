class CartSummaryPage{

get itemsCostList(){

    return $$("tr td:nth-child(4) strong")
}

get totalFromUI(){
    return $("h3 strong")
}

get proceedBtn(){
    return $(".btn-success")
}

async totalCalcution(){

    return (await Promise.all(await this.itemsCostList.map(async (eachItemCost) =>parseInt((await eachItemCost.getText()).split(".")[1].trim() ))))
            .reduce((acc,price)=>acc+price,0)

            console.log("sumOfItems=="+sumOfItems)
}

test(){
    return 5+10
}

}
export default new CartSummaryPage();