const {
    userLogin,
    createProblem,
    //listProblems,
    deleteProblem
} = require("../../../../methods/axios.methods");
const TestData = require("../test_data/testdata");
const Creds = require("../test_data/credentials")
const LoginPage = require("../pageobjects/Login.page");
const Credentials = require("../test_data/credentials");
const PublicationsPage = require("../pageobjects/Publications.page");
const ProblemsPage = require("../pageobjects/Problems.page");
const {clearInputValue} = require('../../../../methods/helper')


async function allRowsInColumnOnPage(column) {
    const arrayRows = [];
    const array = await ProblemsPage.problemRowsTableInColumn(column);
    const pageNumber = await ProblemsPage.paginationNote.getText();
    let n ;
      if (pageNumber[1] === "–")
         n = 0;
      else if
        (pageNumber[2] === "–")
          n = Number(pageNumber[0]+ "0");
      for (let i = 0; i < array.length; i++) {
        const row = await ProblemsPage.problemRowByRowindexInColumn(i+n, column);
        const textRow = await row.getText();
        arrayRows.push(textRow);
      }
    return arrayRows;
}


describe('Checking Problem page', () => {


    var userLoginResponse;
    var userToken;
    before(async () => {
        userLoginResponse = await (userLogin(Credentials.user.email, Credentials.user.password));
        await LoginPage.login(Credentials.user.email, Credentials.user.password);
        userToken = userLoginResponse.accessToken;
    });


    const arrProblemsId = [];

    it('API - Create 5 problems for tests', async () => {

        let result = null;
        for (let i = 1; i < 6; i++) {

            result = await (createProblem({
                title: TestData.newUniqueProblemAPI.title + ` ${i}`,
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
        await expect(ProblemsPage.pageTitle).toHaveText('problems');
    });

    it('user can hide all columns', async () => {
        await browser.pause(500);
        await ProblemsPage.iconColumns.click();
        await browser.pause(500);
        await ProblemsPage.hideAllColumns.click();
        await expect(ProblemsPage.emptyTable).toBePresent();
        await ProblemsPage.iconColumns.click();
    })

    it('user can return back all columns', async () => {
        await browser.pause(500);
        await ProblemsPage.iconColumns.click();
        await browser.pause(500);
        await ProblemsPage.showAllColumns.click();
        await browser.pause(500);
        await expect(ProblemsPage.emptyTable).not.toBePresent();
    });

    it('user can hide any column via [Columns]', async () => {
        await browser.refresh();
        await ProblemsPage.iconColumns.click();
        await browser.pause(500);
        const arrayFields = ["Problem name", "Position", "Company", "Solutions", "Creator"];
        for (let i = 0; i < arrayFields.length; i++) {
            await ProblemsPage.findColumnsByName(arrayFields[i]).click();
            await expect(ProblemsPage.fieldNameColumn(arrayFields[i])).not.toExist();
        }
    });

    it('user can return back any column', async () => {
        const arrayFields = ["Problem name", "Position", "Company", "Solutions", "Creator"];
        let answer = arrayFields.length
        for (let i = 0; i < arrayFields.length; i++) {
            await ProblemsPage.findColumnsByName(arrayFields[i]).click();
            await expect(ProblemsPage.fieldNameColumn(arrayFields[i])).toExist();
        }
    });

    it('user can change density', async () => {
        await ProblemsPage.iconDensity.click();
        //await browser.pause(500);
        await ProblemsPage.densityCompact.click();
        const sizeCompact = await ProblemsPage.firstRow.getCSSProperty('max-height');
        const value1 = await sizeCompact.value;
        //await browser.pause(500);
        await ProblemsPage.iconDensity.click();
        //await browser.pause(500);
        await ProblemsPage.densityStandart.click();
        const sizeStandart = await ProblemsPage.firstRow.getCSSProperty('max-height');
        const value2 = await sizeStandart.value;
        //await browser.pause(500);
        await ProblemsPage.iconDensity.click();
        //await browser.pause(500);
        await ProblemsPage.densityComfortable.click();
        const sizeComfortable = await ProblemsPage.firstRow.getCSSProperty('max-height');
        const value3 = await sizeComfortable.value;
        let answer;
        if (value1 < value2 && value2 < value3)
            answer = true;
        else
            answer = false;

        await expect(answer).toEqual(true);
    })

    it('user can hide [Problem name] column via [Problem name] field ', async () => {
        await ProblemsPage.problemNameField.moveTo();
        await browser.pause(500);
        await ProblemsPage.problemNameFieldMenuIcon.click();
        await browser.pause(500);
        await ProblemsPage.listMenuHide.click();
        //await browser.pause(500);
        await expect(ProblemsPage.problemNameField).not.toBePresent();
    });

    it('user can return back [Problem name] column', async () => {
        //await browser.pause(500);
        await ProblemsPage.iconColumns.click();
        await ProblemsPage.findColumnsByName("Problem name").click();
        await ProblemsPage.iconColumns.click();
        await expect(ProblemsPage.problemNameField).toBePresent();
    });

    it('user can see that problems were filtered with operator [contains] for the field Problem name ', async () => {
        await ProblemsPage.problemNameField.moveTo();
        await ProblemsPage.problemNameFieldMenuIcon.click();
        await browser.pause(500);
        await ProblemsPage.listMenuFilter.click();
        await browser.pause(500);
        await ProblemsPage.inputFilterValue.setValue("river");
        await browser.pause(500);
        await ProblemsPage.iconFilter.click();
        //await browser.pause(1000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('1');
        await browser.keys("Tab")
    });

    it('arrow sorting by ASC is displayed for [Problem name] column', async () => {
        await ProblemsPage.problemNameField.click();
        await browser.pause(500);
        const sort = await ProblemsPage.iconSortProblemName.getAttribute("aria-sort");
        await expect(sort).toEqual('ascending');
    });


    it('arrow sorting by ASC works correctly for [Problem name] column', async () => {
        const arrayOfRows = await allRowsInColumnOnPage('Problem name');
        await expect(arrayOfRows.sort((a, b) => a - b).join(",")).toEqual(arrayOfRows.join(","));
    });

    it('arrow sorting by DESC is displayed for [Problem name] column', async () => {
        await ProblemsPage.problemNameField.click();
        await browser.pause(500);
        const sort = await ProblemsPage.iconSortProblemName.getAttribute('aria-sort')
        await expect(sort).toEqual('descending');
    });

    it('arrow sorting by DESC works correctly for [Problem name] column', async () => {
        const arrayOfRows = await allRowsInColumnOnPage('Problem name');
        await expect(arrayOfRows.sort((a, b) => b - a).join(",")).toEqual(arrayOfRows.join(","));
    });

    it('problems can be unsorted for [Problem name] column', async () => {
        await ProblemsPage.problemNameField.click();
        //await browser.pause(500);
        await expect(ProblemsPage.iconSortProblemName.getCSSProperty('aria-sort')).not.toExist();
    });

    it('user can cancel filtering ', async () => {
        await ProblemsPage.iconFilter.click();
        //await browser.pause(1000);
        await ProblemsPage.deleteFilterButton.click();
        await ProblemsPage.iconFilter.click();
        //await browser.pause(1000);
        await expect(ProblemsPage.iconFilterNumber).toHaveText('0');
    });


    it('filtering works correctly for column[problem name] with operator [contains]', async () => {
        const dataContains = await TestData.dataContainsProblemName.data;
        const answerContains = await TestData.dataContainsProblemName.rowNumber;
        await browser.pause(500);
        await ProblemsPage.iconFilter.click();
        await clearInputValue(ProblemsPage.inputFilterValue);
        for (let i = 0; i < dataContains.length; i++) {
            await ProblemsPage.inputFilterValue.setValue(dataContains[i]);
            await browser.pause(500);
            const problems = await ProblemsPage.problemRowsTableInColumn("Problem name");
            await browser.pause(500);
            await expect(problems.length).toEqual(answerContains[i]);
            await clearInputValue(await ProblemsPage.inputFilterValue);
        }
        await ProblemsPage.iconFilter.click();
    });

    it('filtering works correctly for column[problem name] with operator [equals]', async () => {
        const dataEquals = TestData.dataEqualsProblemName.data;
        const answersEquals = TestData.dataEqualsProblemName.rowNumber;
        await browser.refresh();
        await ProblemsPage.iconFilter.click();
        await ProblemsPage.chooseOperators.selectByVisibleText("equals");
        await clearInputValue(ProblemsPage.inputFilterValue);
        for (let i = 0; i < dataEquals.length; i++) {
            await ProblemsPage.inputFilterValue.setValue(dataEquals[i]);
            await browser.pause(500);
            const problems = await ProblemsPage.problemRowsTableInColumn("Problem name");
            await browser.pause(500);
            await expect(problems.length).toEqual(answersEquals[i]);
            await clearInputValue(await ProblemsPage.inputFilterValue);
        }
    });

    it('filtering works correctly for column[problem name] with operator [starts with]', async () => {
        const dataStart = TestData.dataStartProblemName.data;
        const answersStart = TestData.dataStartProblemName.rowNumber;
        await ProblemsPage.chooseOperators.selectByVisibleText("starts with");
        await clearInputValue(ProblemsPage.inputFilterValue);
        for (let i = 0; i < dataStart.length; i++) {
            await ProblemsPage.inputFilterValue.setValue(dataStart[i]);
            await browser.pause(500);
            const problems = await ProblemsPage.problemRowsTableInColumn("Problem name");
            await browser.pause(500);
            await expect(problems.length).toEqual(answersStart[i]);
            await clearInputValue(await ProblemsPage.inputFilterValue);
        };
    });

    it('filtering works correctly for column[problem name] with operator [ends with]', async () => {
        const dataEnd = TestData.dataEndProblemName.data;
        const answersEnd = TestData.dataEndProblemName.rowNumber;
        await ProblemsPage.chooseOperators.selectByVisibleText("ends with");
        await clearInputValue(ProblemsPage.inputFilterValue);
        for (let i = 0; i < dataEnd.length; i++) {
            await ProblemsPage.inputFilterValue.setValue(dataEnd[i]);
            await browser.pause(500);
            const problems = await ProblemsPage.problemRowsTableInColumn("Problem name");
            await browser.pause(500);
            await expect(problems.length).toEqual(answersEnd[i]);
            await clearInputValue(await ProblemsPage.inputFilterValue);
        };
    });

    it('filtering works correctly for column[problem name] with operator [ends with]', async () => {
        await ProblemsPage.chooseOperators.selectByVisibleText("is empty");
        await expect(ProblemsPage.firstRow).not.toExist();
    });

    it('filtering works correctly for column[problem name] with operator [ends with]', async () => {
        //await browser.pause(500);
        await ProblemsPage.chooseOperators.selectByVisibleText("is not empty");
        await expect(ProblemsPage.firstRow).toExist();
        await ProblemsPage.iconFilter.click();
    });

    it('user can go to the next page of problems', async () => {
        await browser.pause(500);
        await ProblemsPage.nextPageArrow.click();
        await browser.pause(500);
        await expect(ProblemsPage.nextPageArrow).toBeClickable();
    });


    it('user can return to the previous page of problems', async () => {
        await browser.pause(500);
        const secondPage = await allRowsInColumnOnPage("Problem name");
        await browser.pause(500);
        await ProblemsPage.previousPageArrow.click();
        await browser.pause(500);
        const firstPage = await allRowsInColumnOnPage("Problem name");
        await browser.pause(500);
        await expect(firstPage.join(',')).not.toEqual(secondPage.join(','));
    });

    it('notifications of pagination are different on different pages', async () => {
        await browser.pause(500);
        const firstPageNote = await ProblemsPage.paginationNote.getText();
        await browser.pause(500);
        await ProblemsPage.nextPageArrow.click();
        await browser.pause(500);
        const secondPageNote = await ProblemsPage.paginationNote.getText();
        await browser.pause(500);
        await expect(firstPageNote).not.toEqual(secondPageNote);
        await ProblemsPage.previousPageArrow.click();
    });

    it('API - delete problems', async () => {
        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        const admToken = adminLoginRes.accessToken;

        for (let i = 0; i < arrProblemsId.length; i++) {

            const result = (await deleteProblem({problemID: arrProblemsId[i], admToken: admToken}));
            expect(result).toHaveTextContaining("The Problem and all its Solutions have been deleted");
        }
    });

});