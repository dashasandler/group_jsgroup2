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



describe( 'Checking Ploblem page', ()=> {


    var userLoginResponse;
    var userToken;
    before( async () => {
        userLoginResponse = await( userLogin(Credentials.user.email, Credentials.user.password));
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
        userToken = userLoginResponse.accessToken;
    });



    const arrProblemsId = [];

    it('API - Create 5 problems for tests', async () => {

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
        await browser.pause(2000);
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
        const sort = await ProblemsPage.iconSortProblemName.getAttribute("aria-sort");
        await expect(sort).toEqual('ascending');
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
    //
    //     function  arrayRows(limit,column) {
    //         const arrayRows =[];
    //         let element;
    //
    //         for(let i = 1; i < limit; i++){
    //             element = ("i", "Problem name").getText;
    //             arrayRows.push(element);
    //         }
    //         return arrayRows;
    //     };
    //
    //
    //     arrayRows(6, "Problem name");
    //
    //     // const problemsASC = await ProblemsPage.problemsRowsTable("Problem name");
    //
    //     console.log("#######&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    //     console.log(arrayRows());
    //     console.log("#######");
    //     // await browser.pause(2000);
    //     // console.log("-------------------------****************+++++++++++++++++++++++++++++");
    //     // console.log(Array.isArray(problemsASC));
    //     // console.log(problemsASC[0]);
    //     // console.log(problemsA.getText);
    //
    //     console.log("-------------------------****************+++++++++++++++++++++++++++++");
    // console.log( arrayRows(6, "Problem name"))
    //
    //     //await expect(problemsASC.sort((a,b)=> b-a).join(',')).toEqual(problemsASC).join(',');
    //
    // });
    //});


    it('arrow sorting by DESC is displayed for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(2000);
        const sort = await ProblemsPage.iconSortProblemName.getAttribute('aria-sort')
        await expect(sort).toEqual('descending');
    });

    it('problems can be unsorted for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconSortProblemName.getCSSProperty('aria-sort')).not.toExist();
    });


    it('user can cancel filtering ', async () =>{
        await ProblemsPage.iconFilter.click();
        await browser.pause(2000);
        await ProblemsPage.deleteFilterButton.click();
        await ProblemsPage.iconFilter.click();
        await browser.pause(2000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('0');
    });

    it('user can hide [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.moveTo();
        await ProblemsPage.problemNameFieldMenuIcon.click();
        await browser.pause(1000);
        await ProblemsPage.listMenuHide.click();
        await browser.pause(1000);
        await expect(ProblemsPage.problemNameField).not.toBePresent();
    })

    it('user can return back [Problem name] column', async() =>{
        await ProblemsPage.iconColumns.click();
        await browser.pause(1000);
        await ProblemsPage.findColumnsProblem.click();
        await ProblemsPage.iconColumns.click();
        await expect(ProblemsPage.problemNameField).toBePresent();
    })

    it('user can change density', async() =>{
        await ProblemsPage.iconDensity.click();
        await browser.pause(1000);
        await ProblemsPage.densityCompact.click();
        const sizeCompact = await ProblemsPage.firstRow.getCSSProperty('max-height');
        await browser.pause(1000);
        await ProblemsPage.iconDensity.click();
        await browser.pause(1000);
        await ProblemsPage.densityStandart.click();
        const sizeStandart = await ProblemsPage.firstRow.getCSSProperty('max-height');
        await browser.pause(1000);
        await ProblemsPage.iconDensity.click();
        await browser.pause(1000);
        await ProblemsPage.densityComfortable.click();
        const sizeComfortable = await ProblemsPage.firstRow.getCSSProperty('max-height');
        console.log(sizeCompact, sizeStandart,sizeComfortable);
        await expect(sizeCompact).not.toEqual(sizeStandart);
        await expect(sizeCompact).not.toEqual(sizeComfortable);
    })

    it('API - delete problems', async () => {
        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        const admToken = adminLoginRes.accessToken;

        for (let i = 0; i < arrProblemsId.length; i++) {

            const result = (await deleteProblem({ problemID: arrProblemsId[i], admToken: admToken}));
            expect(result).toHaveTextContaining("The Problem and all its Solutions have been deleted");
        }
    });


});