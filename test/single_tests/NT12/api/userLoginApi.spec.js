const {userLoginAPI} = require("../../../methods/axios.methods");
const Creds = require('../../../test_data/credentials')

describe('LOGIN PAGE', () => {

    let result = null;

    it('API - user login', async () => {
        result = await userLoginAPI(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        console.log(result)
        if (result.errors) {
            expect(result.errors.message).toHaveTextContaining("User with provided email does not exist");
            console.error('Login failed,\nuser with provided email does not exist!!!')
        } else {
            console.log(result.accessToken);
            const token = result.accessToken;
            const userID = result.userID;
            expect(!!result.accessToken).toBe(true);
        }
    });

});