const SideBar = require('../pageobjects/NavigationSideBarMenu');
const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublicationsCreatePage = require('../pageobjects/PublicationsCreate.page');
const PublicationViewPage = require('../pageobjects/PublicationView.page');

const TestData = require('../../../../test_data/testdata');
const Creds = require('../../../../test_data/credentials');
//const {expect} = require("chai");

const title = TestData.newPublication2.title;
const description = TestData.newPublication2.description;
const image = TestData.newPublication2.image;
const content = TestData.newPublication2.content;
const sidebar = new SideBar();

describe('Create new publication | e2e test', () => {

    before('Login and open publications page', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    // beforeEach('Go to publications page', async() => {
    //     await sidebar.hamburgerMenuBtn.click();
    //     await sidebar.publicationsMenuItem.click();
    // });


    // it('Should login with valid credentials', async () => {
    //     await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
    //     await expect(PublicationsPage.pageTitle).toBeExisting().true;
    //     await browser.pause(5000)
    //     await expect(PublicationsPage.pageTitle).toHaveText('publications');
    // });

    it('Create new publication using button [ADD PUBLICATION]', async () => {
        await PublicationsPage.addPublication.click();

        await PublicationsCreatePage.publicationTitle.setValue(title);
        await PublicationsCreatePage.publicationImage.setValue(image);
        await PublicationsCreatePage.publicationDescription.setValue(description);
        await PublicationsCreatePage.publicationContent.setValue(content);
        await PublicationsCreatePage.saveButton.click();
        await browser.pause(4000);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    it('verify user can read new publication', async () => {
        const publicationIdLink = await PublicationsPage.publicationIdLink.getAttribute("href");
        const pubId = publicationIdLink.split('/publication/')[1];
//        console.log(pubId);
        await PublicationsPage.publicationTitle.click()
        await expect(PublicationViewPage.editButton).toBeExisting().true;
        await expect(PublicationViewPage.publicationTitle).toHaveText(title);

    });

    it('verify user can delete new publication', async () => {
        //to delete need to use API
        const publicationIdLink = await PublicationsPage.publicationIdLink.getAttribute("href");
        const pubId = publicationIdLink.split('/publication/')[1];
        await PublicationsPage.publicationTitle.click()
        await expect(PublicationViewPage.editButton).toBeExisting().true;
        await expect(PublicationViewPage.publicationTitle).toHaveText(title);

    });

});
