const Page = require('./Page')

class SignupPage extends Page {
    get signupLabel() {
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
        return $('//div[@class="mt-3 text-center"]');
    }

    get loginLink() {
        return $('//a[contains(text(),"Login")]');
    }

    get infoRegSuccess() {
        return $('//div[@class = "container"]/div[1]');
    }

    get infoEmailSent() {
        return $('//div[@class = "container"]/div[2]');
    }

    get errorEmailMsg() {
        return $('//p[@id="email-helper-text"]');
    }

    get errorPasswordMsg() {
        return $('//p[@id="password-helper-text"]');
    }

    get userAlreadyExistsMsg() {
        return $('//div[@class="MuiAlert-message css-1w0ym84"]');
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
