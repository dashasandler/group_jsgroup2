const LoginPage = require('../pageobjects/Login.page');
const SignupPage = require('../../vk77/pageobjects/Signup.page');
const Helper = require('../../../../methods/helper')

describe('User SignUp', () => {

    before('Landing on to sign up page', async () => {
        browser.maximizeWindow();
        await LoginPage.open();
        await LoginPage.linkSignUp.click();
    });

    it('Should not sign-up with empty inputs', async () => {
        await SignupPage.btnSubmit.click();
        await expect(SignupPage.errorEmailValidation).toHaveText('Email validation error');
        await expect(SignupPage.btnSubmit).toBeDisabled();
    });
    it('Should not sign-up with already existent email', async () => {
        await SignupPage.signup(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        await expect(SignupPage.existError).toHaveTextContaining('already exist');
        await expect(SignupPage.existErrorIcon).toBeDisplayed().true;
    });
    it('Should sign-up', async () => {
        await SignupPage.signup(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        await expect(SignupPage.infoRegSuccess).toHaveText('Registration successful!');
        await expect(SignupPage.infoEmailSent).toHaveText('Activation link was sent to email');
    });
});

