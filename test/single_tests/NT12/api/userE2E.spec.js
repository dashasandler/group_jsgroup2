const {
    registerUser,
    registerActivation,
    userLogin,
    deleteUser
} = require("../../../../methods/axios.methods");


describe('User - E2E TESTS (Create/Activation/Login/Logout/UserDelete)', () => {

    let result = null;

    it('API - new user registration', async () => {
        result = await registerUser(process.env.USER_EMAIL, process.env.USER_PASSWORD)
        console.log(result)
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("already exist");
            console.error('user not created, already exist!!! \nTest: API - registration test - failed!!!!')
        } else {
            expect(!!result.activationLinkId).toBe(true);
        }
    });

    it('API - new user activation', async () => {
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("already exist");
            console.error("Test: API - user activation test -  failed!!!!!");
        } else {
            result = await registerActivation(result.activationLinkId)
            expect(result.activationString).toHaveText("Activation Successful!")
        }
    });

    it('API - new user log in', async () => {
        result = await userLogin(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("Error: User with provided email does not exist");
            console.error('Login failed,\nuser with provided email does not exist!!!')
        } else {
            console.log(result.userID)
            expect(!!result.accessToken).toBe(true);
        }
    });
    //add here log out?

    it('API - new user delete', async () => {
        let deleteResult = null;
        const adminLoginRes = (await userLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD));
        /** admin token to delete operation in API*/
        const admToken = adminLoginRes.accessToken;
        /** userId to delete */
        const userID = result.userID;
        console.log("====================================")
        console.log("TestData: userID:"+userID+", adminToken:"+admToken)
        console.log("____________________________________")
        deleteResult = await deleteUser({userID, admToken});

        if (deleteResult.errors) {
            expect(deleteResult.errors.message).toHaveTextContaining("Not found");
            console.error('user Not found!!! \nTest: API - user delete test - failed!!!!')
        } else {
            expect(deleteResult).toHaveTextContaining("User Deleted");
        }
    });

});