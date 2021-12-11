const LoginPage = require('../pageobjects/Login.page');
const PublicationPage = require('../pageobjects/Publication.page');

describe('Login Page', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login('student1.jsgroup2@gmail.com', 'passwordafterreset');
        await expect(PublicationPage.pageTitle).toBeExisting().true;
        await expect(PublicationPage.pageTitle).toHaveText('publications');
    });
});