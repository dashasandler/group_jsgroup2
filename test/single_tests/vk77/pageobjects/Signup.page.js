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
        return $('div.mt-3');
    }

    get linkLogin() {
        return $('div.mt-3>a');
    }

    get errorEmailValidation() {
        return $('#email-helper-text');
        /** Email validation error */
    }

    get existError() {
        return $('div[role="alert"]');
        /**..loginemail.. already exist */
    }

    get existErrorIcon() {
        return $('svg[data-testid="ErrorOutlineIcon"]');
    }

    get errorPasswordValidation() {
        return $('#password-helper-text');
        /** Password must include at least: 6 characters, 1 uppercase, 1 lowercase, 1 numeric or 1 special character. */
    }

    get infoRegSuccess() {
        return $('//div[@class = "container"]/div[1]');
        /** Registration successful! */
    }

    get infoEmailSent() {
        return $('//div[@class = "container"]/div[2]');
        /** Activation link was sent to email */
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
