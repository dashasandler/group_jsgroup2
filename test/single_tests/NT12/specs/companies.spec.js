const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const CompaniesPage = require('../pageobjects/Companies.page');
const Credentials = require('../../../../test_data/credentials');

describe('Get to page Companies', () => {
    before('user login', async() => {
        await browser.maximizeWindow();
        await LoginPage.login(Credentials.nt_creds.email, Credentials.nt_creds.password);
    });

    it('Should get to Companies page after login', async () =>{
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.companiesMenuItem.click();
        await expect(CompaniesPage.pageTitle).toHaveText('companies');
    })
});

// const LoginPage = require('../pageobjects/Login.page');
// const PublicationsPage = require('../pageobjects/Publications.page');
// const CompaniesPage = require('../pageobjects/Companies.page');
// const Creds = require('../../../../test_data/credentials')
//
// describe('Page companies Test vk77', () => {
//     xit('Should login with valid credentials', async () => {
//         await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
//         await expect(PublicationsPage.pageTitle).toBeExisting().true;
//         await expect(PublicationsPage.pageTitle).toHaveText('publications');
//     });
//     xit('Open page companies', async () => {
//         await PublicationsPage.hamburgerMenu.click();
//         await PublicationsPage.companiesMenuItem.click();
//         await browser.pause(5000);
//         await expect(CompaniesPage.pageTitle).toBeExisting().true;
//         await expect(CompaniesPage.pageTitle).toHaveText('companies');
//     });
// });
