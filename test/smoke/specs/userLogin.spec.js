const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const Creds = require('../../../test_data/credentials')

describe('User Login', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
});

describe('User Logout', () => {
    it('Should be able to log out', async () => {
        await PublicationsPage.logout();
        await expect(LoginPage.loginTitle).toBeExisting().true;
    });
});

describe('User Login with wrong email', () => {
    it('Should get error', async () => {
        await LoginPage.login(Creds.errCred.email, Creds.errCred.password);
        await expect(LoginPage.loginEmailError).toBeExisting().true;
        await expect(LoginPage.loginEmailError).toHaveText('User with provided email does not exist');
    });
});

describe('User Login with empty email', () => {
    it('Should get error', async () => {
        await LoginPage.login(Creds.errEmptyEmail.email, Creds.errEmptyEmail.password);
        await expect(LoginPage.loginEmailError).toBeExisting().true;
        await expect(LoginPage.loginEmailError).toHaveText('User with provided email does not exist');
    });
});

describe('User Login with empty password', () => {
    it('Should get error', async () => {
        await LoginPage.login(Creds.errEmptyPassword.email, Creds.errEmptyPassword.password);
        await expect(LoginPage.loginWrongPasswordError).toBeExisting().true;
        await expect(LoginPage.loginWrongPasswordError).toHaveText('Incorrect password');
    });
});

describe('User Login with empty email and password', () => {
    it('Should get error', async () => {
        await LoginPage.login(Creds.errEmptyData.email, Creds.errEmptyData.password);
        await expect(LoginPage.loginEmailError).toBeExisting().true;
        await expect(LoginPage.loginEmailError).toHaveText('User with provided email does not exist');
    });
});

describe('User Login with spaces in the beginning of Email', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login(Creds.vkSpacesInBeginEmail.email, Creds.vkSpacesInBeginEmail.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
        await PublicationsPage.logout();
    });
});

describe('Restore Password', () => {
    it('Should get email sending confirmation', async () => {
        await LoginPage.resetEmail(Creds.vkcreds.email);
        await expect(LoginPage.alertSentRestore).toBeExisting().true;
      //  await expect(LoginPage.alertSentRestore).toHaveText('Password reset email sent');
    });
});