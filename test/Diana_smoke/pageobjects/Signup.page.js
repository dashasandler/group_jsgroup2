const Page = require('./Page')
const {string} = require("fast-glob/out/utils");

class SignupPage extends Page {

    get labelSignup(){
        return $('h3')
    }
    get inputEmail() {
        return $('#email');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    get labelExistingAcct(){
        // return $('//div[@class="ant-row ant-row-center mt-3"]')
        return $(div.ent-row)
    }

    get linkExistingAcct(){
        return $('a[href="/login"]')
    }

    get signupConfirmation(){
        return $('//div[@class="container"]/div[1]')
    }

    get signupSent(){
        return $('//div[@class="container"]/div[2]')
    }

    async signup(username, password) {
        await this.open();
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('signup');
    }
}

module.exports = new SignupPage();
