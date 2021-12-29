const LoginPage = require('../pageobjects/Login.page');
const SignupPage = require('../pageobjects/Signup.page');
const Creds = require('../../../test_data/credentials');

describe('User Signup', () => {
    it('Should sign up with valid credentials', async () => {
        await SignupPage.signup(Creds.newcreds.email, Creds.newcreds.password);
        await expect(SignupPage.signupConfirmation).toBeExisting().true;
        await expect(SignupPage.signupConfirmation).toHaveText('Registration successful!');
        await expect(SignupPage.signupSent).toBeExisting().true;
        await expect(SignupPage.signupSent).toHaveText('Activation link was sent to email');
    });
});