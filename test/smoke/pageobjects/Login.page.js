const Page = require('./Page')

class LoginPage extends Page {

    get inputEmail() {
        return $('#email');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    get loginTitle(){
        return $('//div/h3[text() = \'Login\']');
    }

    get loginEmailError(){
        return $('//div[text() = \'User with provided email does not exist\']');
    }

    get loginWrongPasswordError(){
        return $('//div[text() = \'Incorrect password\']');
    }

    get resetPasswordButton(){
        return $('//div[contains(.,\'Forgot password?\')]/a');
    }
    get signUpButton(){
        return $('//div[contains(.,\'account\')]/a');
    }

    get alertSentRestore(){
        return $('//div[@role = \'alert\']');
    }
    async login(username, password) {
        await this.open();
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async resetEmail(username) {
        await this.resetPasswordButton.click();
        await this.inputEmail.setValue(username);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();
