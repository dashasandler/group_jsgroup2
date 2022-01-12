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
        return $('//a[contains(text(),"Sign Up")]');
    }

    get restoreLink() {
        return $('//div[@class="mt-3 text-center"]/a');
    }

    get alertNoActivation() {
        return $('//div[@class="MuiAlert-message css-1w0ym84"]/div/div');
    }

    get alertActivationLink() {
        return $('//div[@class="MuiAlert-message css-1w0ym84"]/div/a');
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
