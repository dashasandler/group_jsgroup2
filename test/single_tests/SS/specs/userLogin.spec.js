const LoginPage = require('../pageobjects/Login.page');
const PasswordResetPage =require('../pageobjects/PasswordReset.page')
const Publications = require('../pageobjects/Publications.page');
const Credentials = require('../test_data/credentials');
const { clearInputValue } = require('../../../../methods/helper');
const SignupPage = require("../pageobjects/Signup.page");
const {incorrectEmail} = require("../test_data/credentials");

describe('LOGIN PAGE', () => {

    before( async () => {
        await browser.maximizeWindow();
        await LoginPage.open();

    });

    it('user can not login with not registered email', async () => {
        await LoginPage.inputEmail.setValue(Credentials.userWrongData.email);
        await LoginPage.inputPassword.setValue(Credentials.user.password);
        await LoginPage.btnSubmit.click()
        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual("User with provided email does not exist");
    });

    it('user can not login with empty email field', async () => {
        await clearInputValue(await LoginPage.inputEmail);
        await browser.pause(2000);
        await LoginPage.btnSubmit.click();
        await expect(LoginPage.loginLabel).toHaveText('Login');

    });

    it('user can login with correct email', async () => {
        await LoginPage.inputEmail.setValue(Credentials.user.email);
        await LoginPage.btnSubmit.click();
        await expect(Publications.pageTitle).toHaveText('publications');
        await Publications.hamburgerMenu.click();
        await Publications.logoutMenuItem.click();
    });

    it('user can not login with incorrect password', async () => {
        await LoginPage.inputEmail.setValue(Credentials.user.email);
        await LoginPage.inputPassword.setValue(Credentials.userWrongData.password);
        await LoginPage.btnSubmit.click();
        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual("Incorrect password");
    });

    it('user can not login with empty password field', async () => {
        await clearInputValue(await LoginPage.inputPassword);
        await browser.pause(2000);
        await LoginPage.btnSubmit.click();
        await expect(LoginPage.loginLabel).toHaveText('Login');

    });

    it('user can login with correct password', async () => {
        await LoginPage.inputPassword.setValue(Credentials.user.password);
        await LoginPage.btnSubmit.click();
        await expect(Publications.pageTitle).toHaveText('publications');
        await Publications.hamburgerMenu.click();
        await Publications.logoutMenuItem.click();
    });

    it("User can restore password", async () => {
        await LoginPage.restoreLink.click();
        await expect(PasswordResetPage.restorePasswordLabel).toHaveText('Restore password');
        await PasswordResetPage.inputEmail.setValue(Credentials.user.email);
        await PasswordResetPage.btnSubmit.click();
        await expect(PasswordResetPage.successMsg).toHaveText(`Password reset email sent to ${Credentials.user.email}, if such user exists`);
        await clearInputValue(await PasswordResetPage.inputEmail);
    });

    it ('User can not input incorrect e-mail', async () => {
         for (let email of incorrectEmail){
            await PasswordResetPage.inputEmail.setValue(email);
            await browser.keys('Tab');
            await expect(PasswordResetPage.errorMsg).toHaveText("Email validation error");
            await clearInputValue(await PasswordResetPage.inputEmail);
         }
    });

});
