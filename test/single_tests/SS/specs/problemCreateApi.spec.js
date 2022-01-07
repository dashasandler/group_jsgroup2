const {
    userLogin,
    createProblem,
    listProblems,
    deleteProblem
   } = require("../../../../methods/axios.methods");
const TestData =require("../test_data/testdata");
const Creds = require("../test_data/credentials")



describe('Problem E2E TESTS (CreateAndDeleteProblem)', () => {

    let result = null;
    let  userToken = null;
    it('API - new user log in', async () => {
        result = await userLogin(Creds.user.email, Creds.user.password);
        userToken = result.accessToken;
        if (result.errors) {
            console.error("Login failed,user with provided email does not exist!!!")
        } else {
           expect(!!result.accessToken).toBe(true);
        }
    });


    it('API - create problem', async () => {
            result = await createProblem({title: TestData.newProblemAPI.title,
            content: TestData.newProblemAPI.content,
            company: TestData.newProblemAPI.company,
            jobTitle: TestData.newProblemAPI.position,
            accessToken: userToken});
        if (result.errors) {
            expect(result.errors.message).not.toEqual("Problem created");;
            console.error('ProblemCreate test - failed!!!!')
        } else {
            expect(result).toEqual("Problem created");
          }

    });


    it('API - find problem', async () => {
        const title =TestData.newProblemAPI.title;
        result = await listProblems({
            offset:0,
            limit:5,
            accessToken: userToken});

        console.log(Array.isArray(result));
        console.log(Object.keys(result));
        result = result.filter(el=>el.title===title)._id;

        if (result.errors) {
            console.error('findProblemID test - failed!!!!')
        } else {

            return result;
        }
     });


    it('API - delete problem', async () => {

        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        /** admin token to delete operation in API*/
        const admToken = adminLoginRes.accessToken;

        const ID =result;
        result = await deleteProblem({problemId: ID, admToken});

        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("ValidationError: No Publication found by provided ID");
            console.error('Test: API - problem delete test - failed!!!!')
        } else {
            expect(result).toHaveTextContaining("Problem deleted");
        }
    });

  });