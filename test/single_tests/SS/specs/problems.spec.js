const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const ProblemsPage = require('../pageobjects/Problems.page');
const ProblemCreatePage = require('../pageobjects/ProblemCreate.page');
const ProblemViewPage = require("../pageobjects/ProblemView.page");

const Credentials = require('../test_data/credentials');
const TestData = require('../test_data/testdata');

describe('Open page problems', () => {

    before( async () => {
        await browser.maximizeWindow();
        await LoginPage.open();
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
        await browser.pause(2000);
    })

    it('Open page problems', async () => {
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.problemsMenuItem.click();
        await browser.pause(8000);
        await expect(ProblemsPage.pageTitle).toHaveText('problems');
    });

    it ('user can see that problems were filtered with operator [contains] for the field Problem name ', async () =>{
        await ProblemsPage.problemNameField.moveTo();
        await browser.pause(2000);
        await ProblemsPage.problemNameFieldMenuIcon.click();
        await browser.pause(2000);
        await ProblemsPage.listMenuFilter.click();
        await browser.pause(2000);
        await ProblemsPage.inputFilterValue.setValue(TestData.filter.text);
        await browser.pause(2000);
        await ProblemsPage.iconFilter.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('1');
    });

    it ('filtering work correctly for column[problem name] with operator [contains]', async () =>{
        const problems = await ProblemsPage.problemRowsContainTextInColumn( TestData.filter.text,"Problem name");
        await browser.pause(2000);
        await expect(problems.length).toEqual(TestData.filter.rowNumber)
    });

    it ('user can cancel filtering ', async () =>{
        await ProblemsPage.iconFilter.click();
        await browser.pause(2000);
        await ProblemsPage.deleteFilterButton.click();
        await ProblemsPage.iconFilter.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('0');
    });

     it( 'user can create a new problem', async() =>{
        await ProblemsPage.newProblemButton.click();
        await ProblemCreatePage.problemTitle.setValue(TestData.newProblem.title);
        await ProblemCreatePage.problemCompany.click()
        await ProblemCreatePage.chooseGoogleCompany.click();
        await ProblemCreatePage.problemContent.setValue(TestData.newProblem.content);
        await ProblemCreatePage.problemPosition.setValue(TestData.newProblem.position);
        await ProblemCreatePage.saveButton.click();
        await expect(ProblemsPage.problemRowsContainTextInColumn( TestData.newProblem.title, "Problem name")).toBeDisplayed(true);
    });

 });