const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PeoplePage = require('../pageobjects/People.page');
const Creds = require('../../../../test_data/credentials')

describe('Page users Test', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
    it('Open page people', async () => {
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.peopleMenuItem.click();
        await browser.pause(5000);
        await expect(PeoplePage.pageTitle).toBeExisting().true;
        await expect(PeoplePage.pageTitle).toHaveText('users');
    });
});
