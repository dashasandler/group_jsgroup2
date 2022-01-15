const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const TestData = require('../test_data/testdata')

describe('User Login', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
});