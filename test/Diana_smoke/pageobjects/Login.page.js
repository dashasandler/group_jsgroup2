const Page = require('./Page')
const {string} = require("fast-glob/out/utils");

class LoginPage extends Page {

    get inputEmail() {
        return $('#email');
    }

    get inputPassword(){
        return $('#password');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    get linkPasswordReset(){
        return $('.ant-row.ant-row-center.mt-3')
    }

    get linkSignup(){
        return $('//div[@class="ant-row ant-row-center"]')
    }

    async login(username, password) {
        await this.open();
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();
