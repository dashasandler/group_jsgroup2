const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const Creds = require('../../../../test_data/credentials')
//const {expect} = require("chai");
const PublicationsCreatePage = require("../pageobjects/PublicationsCreate.page");

describe('User Login', () => {
    it('Should not login with invalid(empty) credentials', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await browser.refresh();
        await browser.pause(4000);
        await expect(PublicationsCreatePage.publicationTitle.getText()).toEqual('');
    });
    it('Should login with valid credentials', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

});