const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const CompaniesPage = require('../pageobjects/Companies.page');
const Credentials = require('../test_data/credentials');


describe('Page companies Test', () => {

    before( () => {
        browser.maximizeWindow();
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
    it('Open page companies', async () => {
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.companiesMenuItem.click();
        await browser.pause(5000);
        await expect(CompaniesPage.pageTitle).toBeExisting().true;
        await expect(CompaniesPage.pageTitle).toHaveText('companies');
    });
});
