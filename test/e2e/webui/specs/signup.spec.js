const LoginPage = require('../pageobjects/Login.page');
const SignupPage = require('../pageobjects/Signup.page');
let actID ='';
const Creds = require('../../../../test_data/credentials')

describe('User SignUp', () => {

    before( () => {
        browser.maximizeWindow();
        });

    it('Should sign-up', async () => {
        await SignupPage.signup(Creds.newUser.email, Creds.newUser.password);
        await expect(SignupPage.infoRegSuccess).toBeExisting().true;
        await expect(SignupPage.infoRegSuccess).toHaveText('Registration successful!');
        await expect(SignupPage.infoEmailSent).toBeExisting().true;
        await expect(SignupPage.infoEmailSent).toHaveText('Activation link was sent to email');
      //  await browser.getResponseBody()
    });
});