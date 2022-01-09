const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublicationsCreatePage = require('../pageobjects/PublicationsCreate.page');
const PublicationViewPage = require('../pageobjects/PublicationView.page');
const PublicationEditPage = require('../pageobjects/PublicationEdit.page');
const TestData = require('../../../../test_data/testdata')
const helper = require('../../../../methods/helper');

const title = TestData.newPublication2.title;
const description = TestData.newPublication2.description;
const image = TestData.newPublication2.image;
const content = TestData.newPublication2.content;

describe('Publication | e2e test', () => {
    let pubId=null;
    before('Login and open publications page', async () => {
        await LoginPage.login(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    // beforeEach('Go to publications page', async() => {
    //     await sidebar.hamburgerMenuBtn.click();
    //     await sidebar.publicationsMenuItem.click();
    // });

    it('Create new publication using button [ADD PUBLICATION]', async () => {
        await PublicationsPage.sideBarMenu.hamburgerMenuBtn.click();
        await PublicationsPage.sideBarMenu.publicationsMenuItem.click();
        await PublicationsPage.addPublication.click();
        await PublicationsCreatePage.publicationTitle.setValue(title);
        await PublicationsCreatePage.publicationImage.setValue(image);
        await PublicationsCreatePage.publicationDescription.setValue(description);
        await PublicationsCreatePage.publicationContent.setValue(content);
        await PublicationsCreatePage.saveButton.click();
        await expect(PublicationsPage.publicationTitle).toHaveText(title);
        await expect(PublicationsPage.publicationDesciption).toHaveText(description);
    });

    it('Verify user can read new publication', async () => {
        const publicationIdLink = await PublicationsPage.publicationTitle.getAttribute("href");
        pubId = publicationIdLink.split('/publication/')[1];
        await PublicationsPage.publicationTitle.click()
        await expect(PublicationViewPage.editButton).toBeExisting().true;
        await expect(PublicationViewPage.publicationTitle).toHaveText(title);
        await expect(PublicationViewPage.publicationDescription).toHaveText(description);
        await expect(PublicationViewPage.publicationContent).toHaveText(content);
    });

    it('Verify user can edit/update publication', async () => {
        await PublicationViewPage.editButton.click();
        await PublicationEditPage.publicationTitle.setValue(' - updated');
        await PublicationEditPage.publicationDescription.setValue(description);
        await PublicationEditPage.publicationContent.setValue(content);
        await PublicationEditPage.saveButton.click();
        await expect(PublicationViewPage.publicationTitle).toHaveText(title+' - updated');
    });
    it('Verify user can delete new publication - (API admin roles required)', async () => {
        const secret = await helper.getAdminToken();
        const result = await helper. deletePublicationFunction(pubId,secret);
        await PublicationsPage.sideBarMenu.hamburgerMenuBtn.click();
        await PublicationsPage.sideBarMenu.publicationsMenuItem.click();
        console.log("API response received: "+result)
        await expect(result).toEqual('Publication deleted');
    });

});