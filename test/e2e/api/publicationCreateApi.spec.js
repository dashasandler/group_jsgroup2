const {
    userLogin,
    createPublication,
    getPublication,
    deletePublication
} = require("../../../methods/axios.methods");
const TestData = require('../../../test_data/testdata');
const {title, description, image, content} = TestData.newPublication3;


describe('Publication E2E TESTS (CreateAndDeletePublication)', () => {

    let result = null;
    let pubID = null;
    let userToken = null;
    it('API - new user log in', async () => {
        result = await userLogin(process.env.BASE_USER_EMAIL, process.env.BASE_USER_PASSWORD);
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Error: User with provided email does not exist");
            console.error('Login failed,\nuser with provided email does not exist!!!')
        } else {
            console.log(result.userID)
            expect(!!result.accessToken).toBe(true);
        }
    });
    //add here log out?

    it('API - create publication', async () => {
        userToken = result.accessToken;
        result = await createPublication({
            title,
            image,
            description,
            content,
            accessToken: userToken
        });

        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Not found");
            console.error('publication Not found!!! \nTest: PublicationCreate test - failed!!!!')
        } else {
            pubID = result;
            console.log("pubId =>" + pubID)
            expect(result).not.toEqual('');
        }
    });

    it('API - read publication', async () => {
        result = await getPublication(pubID, userToken);
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Not found");
            console.error('publication Not found!!! \nTest: PublicationRead test - failed!!!!')
        } else {
            expect(result._id).toEqual(pubID);
            expect(result.title).toEqual(title);
            expect(result.description).toEqual(description);
            expect(result.content).toEqual(content);
        }
    });
    it('API - delete publication', async () => {

        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        /** admin token to delete operation in API*/
        const admToken = adminLoginRes.accessToken;
        /** userId to delete */

        console.log("====================================")
        console.log("TestData: pubID:"+pubID+", adminToken:"+admToken)
        console.log("____________________________________")
        console.log("++++++++++++++++"+pubID);
        result = await deletePublication({pubID: pubID, admToken});

        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("ValidationError: No Publication found by provided ID");
            console.error('publication Not found!!! \nTest: API - publication delete test - failed!!!!')
        } else {
            expect(result).toHaveTextContaining("Publication deleted");
        }
    });

});