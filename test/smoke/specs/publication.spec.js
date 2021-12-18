const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublicationsCreatePage = require('../pageobjects/PublicationsCreate.page');
const PublicationViewPage = require('../pageobjects/PublicationView.page');

const TestData = require('../../../test_data/testdata')
const Creds = require('../../../test_data/credentials')

const title = TestData.newPublication2.title;
const description = TestData.newPublication2.description;
const image = TestData.newPublication2.image;
const content = TestData.newPublication2.content;

describe('Create new publication', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.login(Creds.vkcreds.email, Creds.vkcreds.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await browser.pause(5000)
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
    /**
     *the following test is disabled to avoid creating multiple publications
     * */
    it('Create new publication using button [ADD PUBLICATION]', async () => {
        await PublicationsPage.addPublication.click();
        //need assert to check is it create new pub form is opened or not
        await PublicationsCreatePage.createPublication(title, image, description, content);
        //need assert to check is it create new pub form is opened or not
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await browser.pause(5000)
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
    it('verify user can read new publication', async () => {
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
        await expect(PublicationsPage.publicationTitle).toHaveText(title);
        await PublicationsPage.publicationTitle.click()
        await expect(PublicationViewPage.editButton).toBeExisting().true;
        await browser.pause(5000)
        await expect(PublicationViewPage.publicationTitle).toHaveText(title);

    });
});