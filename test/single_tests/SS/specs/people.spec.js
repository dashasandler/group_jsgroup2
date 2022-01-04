const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PeoplePage = require('../pageobjects/People.page');

const Credentials = require('../test_data/credentials')


describe('Page users Test', () => {

    before( () => {
        browser.maximizeWindow();
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
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
