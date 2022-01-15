const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublicationCreatePage = require('../pageobjects/PublicationCreate.page');
const PublicationViewPage = require('../pageobjects/PublicationView.page');
const PublicationEditPage = require('../pageobjects/PublicationEdit.page');
const {clearInputValue} = require('../../../../methods/helper');
const TestData = require('../test_data/testdata');
const {userLogin, deletePublication} = require("../../../../methods/axios.methods");
const title = TestData.newPublication2.title;
const description = TestData.newPublication2.description;
const image = TestData.newPublication2.image;
const content = TestData.newPublication2.content;

describe('Create new publication', () => {
    let pubID = null;
    let result = null;
    before('MAXIMIZE', async () => {
        browser.maximizeWindow();
    });

    it(' Login with valid credentials', async () => {
        await LoginPage.login(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    it('Create new publication using button [ADD PUBLICATION]', async () => {
        await PublicationsPage.addPublication.click();
        await PublicationCreatePage.publicationTitle.setValue(title);
        await PublicationCreatePage.publicationImage.setValue(image);
        await PublicationCreatePage.publicationDescription.setValue(description);
        await PublicationCreatePage.publicationContent.setValue(content);
        await PublicationCreatePage.saveButton.click();
        await browser.pause(400);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    it('Verify  that user can view new publication and update publication', async () => {
        await browser.pause(500);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
        await expect(PublicationsPage.publicationTitle).toHaveText(title);
        pubID = await PublicationsPage.publicationTitle.getAttribute('href');
        pubID = pubID.split('/')[2]
        await PublicationsPage.publicationTitle.click();
        await expect(PublicationViewPage.editButton).toBeExisting().true;
        await PublicationViewPage.editButton.click();
        await clearInputValue(await PublicationEditPage.publicationTitle);
        await PublicationEditPage.publicationTitle.setValue('Updated');
        await PublicationEditPage.publicationDescription.setValue(' Updated');
        await PublicationEditPage.publicationContent.setValue('Content Updated');
        await PublicationEditPage.saveButton.click()
        await browser.pause(500)
        await expect(PublicationViewPage.publicationTitle).toHaveText('Updated');
        await expect(PublicationViewPage.publicationVeiwDescription).toHaveText(description + ' Updated');
        await expect(PublicationViewPage.publicationVeiwContent).toHaveText('Content Updated');

    });

    it('Verify  that user can like publication', async () => {

        await PublicationViewPage.likeButton.click();
        await browser.pause(500);
        await expect(PublicationViewPage.likeCounter).toHaveText('1');
    });

    it('Verify  that user can unlike publication', async () => {

        await PublicationViewPage.likeButton.click();
        await browser.pause(500);
        await expect(PublicationViewPage.likeCounter).toHaveText('');
    });

    it('Verify  that user can add comment', async () => {
        const commentText = "Comment added by auto test"
        await PublicationViewPage.commentButton.click();
        await browser.pause(500);
        await PublicationViewPage.commentTextArea.setValue(commentText)
        await PublicationViewPage.commentSendButton.click();
        await browser.pause(500);
        await expect(PublicationViewPage.commentPosted).toHaveText(commentText);
    });

    it('Verify  that user can return to list of publication using back arrow', async () => {
        await browser.refresh();
        await browser.pause(500);
        await PublicationViewPage.returnArrow.click();
        await browser.pause(500);
        await expect(PublicationsPage.pageTitle).toBeExisting().true;
        await expect(PublicationsPage.pageTitle).toHaveText('publications');
        await expect(PublicationsPage.publicationTitle).toHaveText('Updated');
        await expect(PublicationsPage.publicationDescription).toHaveText(description + ' Updated');
    });

    it('Verify  that Load more button is working', async () => {
        await browser.refresh();
        await browser.pause(500);
        await PublicationsPage.loadMoreButton.click();
        // await expect(PublicationsPage.pageTitle).toBeExisting().true;
    });

    it('API - Delete publication', async () => {
        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        const admToken = adminLoginRes.accessToken;
        result = await deletePublication({pubID, admToken});
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("ValidationError: No Publication found by provided ID");
            console.error('publication Not found!!! \nTest: API - publication delete test - failed!!!!')
        } else {
            expect(result).toHaveTextContaining("Publication deleted");
        }
    });
});