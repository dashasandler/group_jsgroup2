const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const ProblemsPage = require('../pageobjects/Problems.page');
const ProblemCreatePage = require('../pageobjects/ProblemCreate.page');
const ProblemViewPage = require("../pageobjects/ProblemView.page");

const Credentials = require('../../../../test_data/credentials');
const TestData = require('../../../../test_data/testdata');

const title = TestData.newProblem.title;
const company = TestData.newProblem.company;
const position = TestData.newProblem.position;
const content = TestData.newProblem.content;

describe('Open page problems', () => {

    before( () => {
        browser.maximizeWindow();
    });

    it('Should login with valid credentials', async () => {
      await LoginPage.login(Credentials.user.email, Credentials.user.password);
      await expect(PublicationsPage.pageTitle).toBeExisting().true;
      await expect(PublicationsPage.pageTitle).toHaveText('publications');
    });

    it('Open page problems', async () => {
      await PublicationsPage.hamburgerMenu.click();
      await PublicationsPage.problemsMenuItem.click();
      await browser.pause(5000);
      await expect(ProblemsPage.pageTitle).toBeExisting().true;
      await expect(ProblemsPage.pageTitle).toHaveText('problems');
    });

    it('Create new problem using button [SAVE PROBLEM]', async () => {
        await ProblemsPage.newProblemButton.click();
        await browser.pause(3000);
        await ProblemCreatePage.createProblem(title, company, position, content);
    });

    it('Open new problem', async () => {
        await browser.pause(5000)
        await ProblemsPage.newProblemTitle.click();
        await browser.pause(5000)
        await ProblemViewPage.addNewSolution.click();
        await expect(ProblemsPage.pageTitle).toHaveText('problems');
    });

});