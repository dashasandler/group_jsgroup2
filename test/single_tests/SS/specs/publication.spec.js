const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublicationsCreatePage = require('../pageobjects/PublicationsCreate.page');
const PublicationViewPage = require('../pageobjects/PublicationView.page');

const TestData = require('../test_data/testdata')
const Credentials = require('../test_data/credentials')


const title = TestData.newPublication.title;
const description = TestData.newPublication.description;
const image = TestData.newPublication.image;
const content = TestData.newPublication.content;

describe('Create new publication', () => {

    before( () => {
        browser.maximizeWindow();
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await browser.pause(5000)
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });
    /**
     *the following test is disabled to avoid creating multiple publications
     * */

    it('user can create new publication using button [ADD PUBLICATION]', async () => {
        await PublicationsPage.addPublication.click();
        //need assert to check is it create new pub form is opened or not
        await PublicationsCreatePage.createPublication(title, image, description, content);
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.publicationsMenuItem.click();
        //need assert to check is it create new pub form is opened or not
        await browser.pause(5000)
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    it('user can like new publication', async () => {
        await expect(PublicationsPage.publicationTitle).toHaveTextContaining(title);
        await browser.pause(3000)
        await PublicationsPage.publicationTitle.click();
        await PublicationViewPage.likeButton.click();
        await expect(PublicationViewPage.likesNumber).toHaveText("1");

    });
});