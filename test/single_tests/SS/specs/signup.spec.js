const LoginPage = require('../pageobjects/Login.page');
const SignupPage = require('../pageobjects/Signup.page');
const Credentials = require('../test_data/credentials');
const { clearInputValue } = require('../../../../methods/helper')
const { incorrectEmail } = require("../test_data/credentials");
const { incorrectPassword } = require("../test_data/credentials");


describe('User SignUp', () => {

    before( async () => {
        await browser.maximizeWindow();
        await SignupPage.open();

    });

    it ("User with an account can not sign up again", async () => {
        await SignupPage.inputEmail.setValue(Credentials.user.email);
        await SignupPage.inputPassword.setValue(Credentials.user.password);
        await SignupPage.btnSubmit.click();
        await browser.pause(2000);
        await expect(SignupPage.userAlreadyExistsMsg).toHaveText(`User with ${Credentials.user.email} already exist`);
    });

    it ("User can go to login page and return back to sign up page", async () => {
        await SignupPage.loginLink.click();
        await browser.pause(2000);
        await expect(LoginPage.loginLabel).toHaveText('Login');
        await LoginPage.signupLink.click()
        await browser.pause(2000);
        await expect(SignupPage.signupLabel).toHaveText('Sign Up');
    });


    it ('User can not  sign up with incorrect e-mail', async () => {

        for (let email of incorrectEmail){
          await SignupPage.inputEmail.setValue(email);
          await browser.keys('Tab');
          await expect(SignupPage.errorEmailMsg).toHaveText("Email validation error");
          await clearInputValue(await SignupPage.inputEmail);
        }
    });

    it('User can not sign up with incorrect password', async () => {
        await SignupPage.inputEmail.setValue(Credentials.newUser.email);
        for (let password of incorrectPassword) {
            await SignupPage.inputPassword.setValue(password);
            await SignupPage.btnSubmit.click();
            await expect(SignupPage.errorPasswordMsg).toHaveText("Password must include at least: 6 characters, 1 uppercase, 1 lowercase, 1 numeric or 1 special character.")
            await clearInputValue(await SignupPage.inputPassword);
        }
    });

    it('User can sign up with correct email and password', async () => {
        await SignupPage.inputEmail.setValue(Credentials.newUser.email);
        await SignupPage.inputPassword.setValue(Credentials.newUser.password);
        await SignupPage.btnSubmit.click();
        await browser.pause(2000);
        await expect(SignupPage.infoRegSuccess).toHaveText('Registration successful!');
        await expect(SignupPage.infoEmailSent).toHaveText('Activation link was sent to email');
    });

});