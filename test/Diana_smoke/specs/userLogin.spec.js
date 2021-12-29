const TestPublicationPage = require("../pageobjects/PublicationTest.page");
const LoginPage = require("../pageobjects/Login.page");

describe('TC1 - Publication', () => {
    before(() => {
        browser.maximizeWindow();
    })
    it('Should login with valid credentials', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
});