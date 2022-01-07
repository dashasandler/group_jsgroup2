const {
    userLogin,
    createPublication,
    deletePublication
} = require("../../../methods/axios.methods");


describe('Publication E2E TESTS (CreateAndDeletePublication)', () => {

    let result = null;

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
        const  userToken = result.accessToken;
        result = await createPublication({title:"title",image:"image",description: "description",
            content: "content", accessToken: userToken});

        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Not found");
            console.error('publication Not found!!! \nTest: PublicationCreate test - failed!!!!')
        } else {
            expect(result).not.toEqual('');
            //{"data":{"publicationCreate":{"_id":"61d4e6bb63a03bd3c3b3f14a","title":"ok","description":"ok","content":"ok","image":"","owner":{"_id":"61b411db628c28d7243f0d11","firstName":"John","lastName":"Silver","image":"http://placeimg.com/640/480/abstract","__typename":"User"},"likes":[],"createdAt":"1641342651013","updatedAt":"1641342651013","__typename":"Publication"}}}

        }
    });

    it('API - delete publication', async () => {

        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        /** admin token to delete operation in API*/
        const admToken = adminLoginRes.accessToken;
        /** userId to delete */

        console.log("====================================")
        console.log("TestData: pubID:"+result+", adminToken:"+admToken)
        console.log("____________________________________")
        const pubID =result;
        console.log("++++++++++++++++"+pubID);
        result = await deletePublication({pubID, admToken});

        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("ValidationError: No Publication found by provided ID");
            console.error('publication Not found!!! \nTest: API - publication delete test - failed!!!!')
        } else {
            expect(result).toHaveTextContaining("Publication deleted");
        }
    });

});