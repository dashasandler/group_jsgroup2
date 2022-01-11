const {
    userLogin,
    createProblem,
    //listProblems,
    deleteProblem
} = require("../../../../methods/axios.methods");
const TestData =require("../test_data/testdata");
const Creds = require("../test_data/credentials")
const LoginPage = require("../pageobjects/Login.page");
const Credentials = require("../test_data/credentials");
const PublicationsPage = require("../pageobjects/Publications.page");
const ProblemsPage = require("../pageobjects/Problems.page");



describe('Checking Ploblem page', ()=> {


    var userLoginResponse;
    var userToken;
    before( async () => {
        userLoginResponse = await( userLogin(Credentials.user.email, Credentials.user.password));
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
        userToken = userLoginResponse.accessToken;
    });



    const arrProblemsId = [];

    it('Create 5 problems for tests', async () => {

        let result = null;
        for (let i = 1; i < 6; i++) {

            result = await( createProblem({
                title: TestData.newUniqueProblemAPI.title + `  ${i}`,
                company: TestData.newUniqueProblemAPI.company,
                jobTitle: TestData.newUniqueProblemAPI.position + ` #${i}`,
                content: TestData.newUniqueProblemAPI.content,
                accessToken: userToken
            }));

            arrProblemsId.push(result);
        }
        await expect(arrProblemsId.length).toEqual(5);
    });


    it('Open page problems', async () => {
        await PublicationsPage.hamburgerMenu.click();
        await PublicationsPage.problemsMenuItem.click();
        await expect(ProblemsPage.pageTitle).toHaveText('problems');
    });

    it ('user can see that problems were filtered with operator [contains] for the field Problem name ', async () =>{
        await ProblemsPage.problemNameField.moveTo();
        await ProblemsPage.problemNameFieldMenuIcon.click();
        await browser.pause(1000);
        await ProblemsPage.listMenuFilter.click();
        await browser.pause(1000);
        await ProblemsPage.inputFilterValue.setValue("river");
        await browser.pause(1000);
        await ProblemsPage.iconFilter.click();
        await browser.pause(1000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('1');
        await browser.keys("Tab")
    });

    it ('filtering work correctly for column[problem name] with operator [contains]', async () =>{
        const problems = await ProblemsPage.problemRowsContainTextInColumn( "river","Problem name");
        await browser.pause(2000);
        await expect(problems.length).toEqual(5)
    });

    it('arrow sorting by ASC is displayed for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconSortAscProblemName).toExist(true);
    });


    // it('Arrow sorting by ASC works correctly for [Problem name] column', async() =>{
    //     const problemsASC = await ProblemsPage.problemRowsContainTextInColumn("river","Problem name");
    //     await browser.pause(2000);
    //     problemsASC.forEach(el=>{
    //         console.log(el.getText())})
    //
    //     console.log("2****************"+ problemsASC.join(','));
    //     console.log("3****************"+ problemsASC.sort((a,b)=> a-b).join(','))
    //     await expect(problemsASC.sort((a,b)=> b-a).join(',')).toEqual(problemsASC.join(','));
    // });


    it('arrow sorting by DESC is displayed for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconSortDescProblemName).toBePresent(true);
    });

    it('problems can be unsorted for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconSortAscProblemName).not.toBePresent(true);
    });


    it('user can cancel filtering ', async () =>{
        await ProblemsPage.iconFilter.click();
        await browser.pause(2000);
        await ProblemsPage.deleteFilterButton.click();
        await ProblemsPage.iconFilter.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('0');
    });



    it('API - delete problems', async () => {
        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        const admToken = adminLoginRes.accessToken;

        for (let i = 0; i < arrProblemsId.length; i++) {

            const result = (await deleteProblem({ problemID: arrProblemsId[i], admToken: admToken}));
            expect(result).toHaveTextContaining("The Problem and all its Solutions have been deleted");
        }
    });


});