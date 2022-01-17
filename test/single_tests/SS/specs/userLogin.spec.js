const LoginPage = require('../pageobjects/Login.page');
const PasswordResetPage =require('../pageobjects/PasswordReset.page')
const Publications = require('../pageobjects/Publications.page');
const Credentials = require('../test_data/credentials');
const { clearInputValue } = require('../../../../methods/helper');
const SignupPage = require("../pageobjects/Signup.page");
const { incorrectEmail } = require("../test_data/credentials");
const {registerUser, registerActivation} = require("../../../../methods/api.methods");
const {userLogin, deleteUser} = require("../../../../methods/axios.methods");

describe('LOGIN PAGE', () => {

    before( async () => {
        await browser.maximizeWindow();
        await LoginPage.open();

    });

    it('Should not login without credentials', async () => {
        await LoginPage.btnSubmit.click();
        await expect(LoginPage.loginLabel).toHaveTextContaining('Login');
    });

    it('user can not login with not registered email', async () => {
        await LoginPage.inputEmail.setValue(Credentials.userWrongData.email);
        await LoginPage.inputPassword.setValue(Credentials.user.password);
        await LoginPage.btnSubmit.click();
        const res = await LoginPage.alertMsg.getText();
        await expect(res).toEqual("User with provided email does not exist");
    });

    it('user can not login with empty email field', async () => {
        await clearInputValue(await LoginPage.inputEmail);
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

    it ('User can not input incorrect e-mail for PasswordReset', async () => {
         for (let email of incorrectEmail){
            await PasswordResetPage.inputEmail.setValue(email);
            await browser.keys('Tab');
            await expect(PasswordResetPage.errorMsg).toHaveText("Email validation error");
            await clearInputValue(await PasswordResetPage.inputEmail);
         }
    });

    let result;
    const newEmail = Credentials.newUser.email;
    const newPassword = Credentials.newUser.password;

    it('API - registration', async () => {
        result = await registerUser(newEmail, newPassword);
        expect(!!result.activationLink).toBe(true);
    });

    it ("User can't log in after sign up  without activation", async () => {
        await PasswordResetPage.backToLoginLink.click();
        await browser.pause(500);
        await PasswordResetPage.backToLoginLink.click();
        await browser.pause(500);
        await LoginPage.inputEmail.setValue(newEmail);
        await LoginPage.inputPassword.setValue(newPassword);
        await LoginPage.btnSubmit.click();
        await expect(LoginPage.alertNoActivation).toHaveText("User is not activated. Please use activation link from registration email!");
        await expect(LoginPage.alertActivationLink).toHaveText("Or resend new activation link");
        await browser.refresh();
    });

    it('API - user activation', async () => {
        await registerActivation(result.activationLink);
        expect(result.activationString).toHaveText("Activation Successful!");
    });

    it ('User can log in after activation', async () => {
        await browser.pause(500);
        await LoginPage.inputEmail.setValue(newEmail);
        await LoginPage.inputPassword.setValue(newPassword);
        await LoginPage.btnSubmit.click();
        await expect(Publications.pageTitle).toHaveText('publications');
    });

    let userID;
    it('API -login', async () =>{
        userID = await (userLogin(newEmail, newPassword));
        await expect(userID.length).not.toEqual(0);
    })

    it("API -user delete", async ()=>{
        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        const admToken = adminLoginRes.accessToken;
        result = await deleteUser(userID,admToken);
        expect(result).toHaveTextContaining("The user has been deleted");
    });


});
