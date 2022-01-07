const {
    userLogin,
    createProblem,
    getProblemId,
    deleteMyProblem,
} = require("../../../../methods/axios.methods");


describe('Problem E2E TESTS (CreateAndDeleteProblem)', () => {

    let result = null;
    let myTitle = "NTENtest48";

    it('API - user log in', async () => {
        result = await userLogin(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Error: User with provided email does not exist");
            console.error('Login failed,\nuser with provided email does not exist!!!')
        } else {
            console.log(result.userID)
            expect(!!result.accessToken).toBe(true);
        }
    });

    it('API - create Problem', async () => {
        const  userToken = result.accessToken;
        result = await createProblem({title: myTitle, company: "617a184bb95fa7cfcbf1b831",  jobTitle: "description",
            content: "content", accessToken: userToken});

        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Error: Problem with same title already exist");
            console.error('Problem not created!!! "Error: Problem with same title already exist"!!!!')
        } else {
            expect(result).toEqual("Problem created");
        }
    });

    it('API - delete problem', async () => {

        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        /** admin token to delete operation in API*/
        const admToken = adminLoginRes.accessToken;
        /** userId to delete */

        const problemID = await getProblemId({myTitle, admToken});
        result = await deleteMyProblem({problemID, admToken});

        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("ValidationError: No Publication found by provided ID");
            console.error('problem Not found!!! \nTest: API - problem delete test - failed!!!!')
        } else {
            expect(result).toHaveTextContaining("Problem deleted");
        }
    });

});