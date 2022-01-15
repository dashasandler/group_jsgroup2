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

async function allRowsInColumnOnPage(column) {
    const arrayRows = [];
    const array = await ProblemsPage.problemRowsTableInColumn(column);

    for (let i = 0; i < array.length; i++) {
        const row = await ProblemsPage.problemRowByRowindexInColumn(i, column);
        const textRow = await row.getText();
        arrayRows.push(textRow);
    }
    return arrayRows;
}



describe( 'Checking Problem page', ()=> {


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
                jobTitle: TestData.newUniqueProblemAPI.position + ` ${i}`,
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
        await browser.pause(1000);
        await expect(ProblemsPage.pageTitle).toHaveText('problems');
        });


    it('user can hide [Problem name] column via [Problem name] field ', async() =>{
        await ProblemsPage.problemNameField.moveTo();
        await browser.pause(1000);
        await ProblemsPage.problemNameFieldMenuIcon.click();
        await browser.pause(1000);
        await ProblemsPage.listMenuHide.click();
        await browser.pause(1000);
        await expect(ProblemsPage.problemNameField).not.toBePresent();
    });

    it('user can return back [Problem name] column', async() =>{
        await browser.pause(1000);
        await ProblemsPage.iconColumns.click();
        await ProblemsPage.findColumnsByName("Problem name").click();
        await ProblemsPage.iconColumns.click();
        await expect(ProblemsPage.problemNameField).toBePresent();
    });

    it('user can hide all columns', async() =>{
        await browser.pause(1000);
        await ProblemsPage.iconColumns.click();
        await browser.pause(1000);
        await ProblemsPage.hideAllColumns.click();
        await expect(ProblemsPage.emptyTable).toBePresent();

    })

    it('user can return back all columns', async() =>{
        await ProblemsPage.showAllColumns.click();
        await browser.pause(1000);
        await expect(ProblemsPage.emptyTable).not.toBePresent();
    });

    it('user can hide any column via [Columns]', async() =>{
        await browser.refresh();
        await ProblemsPage.iconColumns.click();
        await browser.pause(1000);
        const arrayFields =["Problem name","Position","Company","Solutions", "Creator"];
        for(let i =0; i <arrayFields.length; i++) {
            await ProblemsPage.findColumnsByName(arrayFields[i]).click();
            await expect(ProblemsPage.fieldNameColumn(arrayFields[i])).not.toExist();
        }

    });

        it('user can return back any column', async() =>{
            const arrayFields =["Problem name","Position","Company","Solutions", "Creator"];
            let answer = arrayFields.length
            for(let i =0; i <arrayFields.length; i++) {
                await ProblemsPage.findColumnsByName(arrayFields[i]).click();
                await expect(ProblemsPage.fieldNameColumn(arrayFields[i])).toExist();
              }
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
        await browser.pause(1000);
        await expect(problems.length).toEqual(5)
    });

    it('arrow sorting by ASC is displayed for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(1000);
        const sort = await ProblemsPage.iconSortProblemName.getAttribute("aria-sort");
        await expect(sort).toEqual('ascending');
    });


    it('Arrow sorting by ASC works correctly for [Problem name] column', async() => {
        const arrayOfRows = await allRowsInColumnOnPage ('Problem name');
        await expect(arrayOfRows.sort((a,b)=>a-b).join(",")).toEqual(arrayOfRows.join(","));
    });

    it('arrow sorting by DESC is displayed for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(1000);
        const sort = await ProblemsPage.iconSortProblemName.getAttribute('aria-sort')
        await expect(sort).toEqual('descending');
    });

    it('Arrow sorting by DESC works correctly for [Problem name] column', async() => {
        const arrayOfRows = await allRowsInColumnOnPage ('Problem name');
        await expect(arrayOfRows.sort((a,b)=>b-a).join(",")).toEqual(arrayOfRows.join(","));
    });



    it('problems can be unsorted for [Problem name] column', async() =>{
        await ProblemsPage.problemNameField.click();
        await browser.pause(1000);
        await expect(ProblemsPage.iconSortProblemName.getCSSProperty('aria-sort')).not.toExist();
    });


    it('user can cancel filtering ', async () =>{
        await ProblemsPage.iconFilter.click();
        await browser.pause(1000);
        await ProblemsPage.deleteFilterButton.click();
        await ProblemsPage.iconFilter.click();
        await browser.pause(1000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('0');
    });

    it('user can change density', async() =>{
        await ProblemsPage.iconDensity.click();
        await browser.pause(1000);
        await ProblemsPage.densityCompact.click();
        const sizeCompact = await ProblemsPage.firstRow.getCSSProperty('max-height');
        const value1 = await sizeCompact.value;
        await browser.pause(1000);
        await ProblemsPage.iconDensity.click();
        await browser.pause(1000);
        await ProblemsPage.densityStandart.click();
        const sizeStandart = await ProblemsPage.firstRow.getCSSProperty('max-height');
        const value2 = await sizeStandart.value;
        await browser.pause(1000);
        await ProblemsPage.iconDensity.click();
        await browser.pause(1000);
        await ProblemsPage.densityComfortable.click();
        const sizeComfortable = await ProblemsPage.firstRow.getCSSProperty('max-height');
        const value3 = await sizeComfortable.value;
        let answer;
         if (value1< value2 && value2 < value3)
            answer = true;
         else
            answer = false;

        await expect(answer).toEqual(true);
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