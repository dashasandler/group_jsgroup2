const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const CompaniesPage = require('../pageobjects/Companies.page');
const Credentials = require('../../../../test_data/credentials');


describe('Get to page Companies', () => {
    before('user logs in', async() => {
        await browser.maximizeWindow();
        await LoginPage.login(Credentials.ab_creds.email, Credentials.ab_creds.password);
    });

    it('Should get to Companies page after login', async() => {
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.companiesMenuItem.click();
        await expect(CompaniesPage.pageTitle).toHaveText('companies');
    });
 
    //it('Should have Apple company tile', async )
});

