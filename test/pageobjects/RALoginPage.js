class LoginPage{

get username(){
    return  $("#username")
}

get password(){
    return $("input[name='password']")
}

get signInBtn(){
    return $("#signInBtn")
}
get alert(){
    return  $(".alert-danger")
}

get info(){
    return $('p')
}


async Login(userName,password){

   await this.username.setValue(userName)
   await this.password.setValue(password)
   await this.signInBtn.click()
}


}

export default new LoginPage();