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

    before( async () => {
        await browser.maximizeWindow();
        await LoginPage.open();
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
        await browser.pause(2000);
    })

    it('user can create new publication using button [ADD PUBLICATION]', async () => {
        await PublicationsPage.addPublication.click();
        await PublicationsCreatePage.createPublication(title, image, description, content);
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.publicationsMenuItem.click();
        await expect(PublicationsPage.publicationTitle).toHaveTextContaining(title);
    });

    it('user can open and like new publication', async () => {
        await PublicationsPage.publicationTitle.click();
        await browser.pause(2000);
        await PublicationViewPage.likeButton.click();
        await expect(PublicationViewPage.likesNumber).toHaveText("1");


    });

    it('user can see increasing the number of likes for the publication in the list of publications', async () => {
        await PublicationViewPage.hamburgerMenu.click();
        await PublicationsPage.publicationsMenuItem.click();
        await browser.pause(2000);
        await expect(PublicationsPage.likesNumber).toHaveText("1");

    });

    it('user can unlike new publication', async () => {
        await browser.refresh();
        await PublicationsPage.publicationTitle.click();
        await browser.pause(2000);
        await PublicationViewPage.likeButton.click();
        await browser.pause(2000);
        await expect(PublicationViewPage.likesNumber).toHaveText("");
    });

    it('user can see reducing the number of likes for the publication in the list of publications', async () => {
        await PublicationViewPage.hamburgerMenu.click();
        await PublicationsPage.publicationsMenuItem.click();
        await browser.pause(2000);
        await expect(PublicationsPage.likesNumber).toHaveText("");


    });
});