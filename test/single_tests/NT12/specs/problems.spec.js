const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page')
const ProblemsPage = require('../pageobjects/Problems.page');
const Credentials = require('../../../../test_data/credentials');

describe('Get to page Problems', () => {
    before('user login', async() => {
        await browser.maximizeWindow();
        await LoginPage.login(Credentials.nt_creds.email, Credentials.nt_creds.password);
    });

    it('Should get to Problems page', async () =>{
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.problemsMenuItem.click();
        await expect(ProblemsPage.pageTitle).toHaveText('problems');
    });
});
