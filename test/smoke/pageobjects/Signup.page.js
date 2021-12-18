const Page = require('./Page')

class SignupPage extends Page {
    get loginLabel() {
        return $('h3');
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

    get labelHaveAcct() {
        return $('div.ant-row');
    }

    get infoRegSuccess() {
        return $('//div[@class = "container"]/div[1]');
    }

    get infoEmailSent() {
        return $('//div[@class = "container"]/div[2]');
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
