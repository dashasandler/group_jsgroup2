const chai = require('chai');
const { userLogin, createProblem, getProblemsList } = require("../../../../methods/axios.methods");
const testdataProb = require('../../../../test_data/testdata');


describe('API PROBLEMS', () => {
    let result = null;
    let accessId = null;
    let title = "";
    before('Login to app', async () => {
        result = await userLogin(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        accessId = result.accessToken;
    });
    it('Create problem', async () => {
        title = testdataProb.newProblem.title;
        if (result.errors) {
            console.error("Test: API - user login failed!!!!!");
        } else {
            result = await createProblem({title, company: testdataProb.newProblem.company, jobTitle: testdataProb.newProblem.position, content: testdataProb.newProblem.content, accessToken: accessId});
            await expect (result).not.toEqual("");
        }
    });
    it('Get problems list', async () => {
        if (result.errors) {
            console.error("Test: API - problem create failed!!!!!");
        } else {
            result = await getProblemsList(accessId);
            await expect (result.length).toBeGreaterThanOrEqual(1);
            await expect (result.find(element => element.title == title)).toBeExisting.true;
            }
        }); 
});