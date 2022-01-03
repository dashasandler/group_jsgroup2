const Page = require('./Page')

class LoginPage extends Page {
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

    get alertMsg() {
        return $('//div[@class="mt-3"]/div/div[2]');
    }

    get signupLink() {
        return $('//div[@class="text-center"]/a');
    }

    get restoreLink() {
        return $('//div[@class="mt-3 text-center"]/a');
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
