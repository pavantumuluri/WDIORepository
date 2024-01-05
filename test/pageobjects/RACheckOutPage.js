class CheckOutPage{

    get countyTxtBox(){
        return $("#country")
    }

    get loadingDots(){
        return $(".lds-ellipsis")
    }

    get indiaLink(){
        return $("=India")
    }

    get submit(){
        return $("input[type='submit']")
    }

    get successMsg(){
        return $(".alert-success")
    }


}
export default new CheckOutPage();