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

    async login(username, password) {
        await this.open();
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(3000)
    }

    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();
