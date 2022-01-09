const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');

describe('User Login', () => {
    before(() => {
        browser.maximizeWindow();
    });
    it('Should not login with empty email and password', async () => {
        await LoginPage.login();
        await expect(LoginPage.loginLabel).toBeDisplayed().true;
        await expect(LoginPage.inputEmail).toBeFocused();
    });
    it('Should not login with empty password', async () => {
        await LoginPage.login(process.env.BASE_USER_EMAIL);
        await expect(LoginPage.loginLabel).toBeDisplayed().true;
        await expect(LoginPage.inputEmail).toBePresent();
    });
    it('Should not login with empty email', async () => {
        await LoginPage.login(null, process.env.BASE_USER_PASSWORD);
        await expect(LoginPage.loginLabel).toBeDisplayed().true;
        await expect(LoginPage.inputEmail).toBeFocused();
    });
    it('Should login with valid credentials', async () => {
        await LoginPage.login(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
    it('Should logout', async () => {
        await PublicationsPage.sideBarMenu.hamburgerMenuBtn.click();
        await PublicationsPage.sideBarMenu.logoutBtn.click();
        await expect(LoginPage.loginLabel).toBeDisplayed().true;
        await expect(LoginPage.loginLabel).toHaveText('Login');
    });
});