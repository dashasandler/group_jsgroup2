const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const Creds = require('../../../../test_data/credentials')

describe('User Login', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
});