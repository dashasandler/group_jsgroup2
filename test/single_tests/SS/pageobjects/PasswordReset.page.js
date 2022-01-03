const Page = require('./Page')

class PasswordResetPage extends Page {
    get restorePasswordLabel() {
        return $('h3');
    }

    get inputEmail() {
        return $('#email');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    get errorMsg() {
        return $('//p[@id="email-helper-text"]');
    }

    get backToLoginLink() {
        return $('//div[@class="text-center"]/a');
    }

    get successMsg() {
        return $('//div[@class="MuiAlert-message css-1w0ym84"]');
    }

    async passwordReset(username) {
        await this.open();
        await this.inputEmail.setValue(username);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('passwordReset');
    }
}

module.exports = new PasswordResetPage();
