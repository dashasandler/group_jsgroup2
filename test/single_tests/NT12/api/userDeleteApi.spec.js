const {
    registerUser,
    registerActivation,
    userLoginAPI,
    deleteUser
} = require("../../../methods/axios.methods");

const adminLoginRes = await userLoginAPI(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
const adminToken = adminLoginRes.accessToken;
console.log(adminToken);
describe('SIGN UP PAGE', () => {

    let result = null;

    it('API - user delete', async () => {

        //needs to provide user id and access token(admin)
        result = await deleteUser({})
        console.log(result)
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("already exist");
            console.error('user not created, already exist!!! \nTest: API - registration test - failed!!!!')
        } else {
            expect(!!result.activationLink).toBe(true);
        }
    });


});