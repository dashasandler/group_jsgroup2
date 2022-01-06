const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublicationsCreatePage = require("../pageobjects/PublicationsCreate.page");

describe('User Login', () => {

    it('Should not login without credentials', async () => {
        await LoginPage.login();
        await expect(LoginPage.loginLabel).toHaveText('Login');
    });
   
   
    it('Should not login with invalid credentials', async () => {
        await LoginPage.login(process.env.BASE_USER_EMAIL, process.env.ADMIN_PASSWORD);
        await expect(LoginPage.incorrectPswMsg).toBeDisplayed();
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.login(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    
});